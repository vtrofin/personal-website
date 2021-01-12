<template>
  <main>
    <h1>Contact me...</h1>
    <p>...if you can!</p>
    <form method="post" @submit.prevent="handleFormSubmit">
      <div class="form-input">
        <label for="name"> Name </label>
        <input id="name" type="text" name="name" />
      </div>
      <div class="form-input">
        <label for="email"> Email </label>
        <input id="email" type="email" name="email" />
      </div>
      <div class="form-input">
        <label for="subject"> Subject </label>
        <input id="subject" type="text" name="subject" />
      </div>
      <div class="form-input">
        <label for="message"> Message </label>
        <textarea id="message" name="message" rows="5" />
      </div>
      <button type="submit" :disabled="isLoading">
        Send
      </button>
      <div class="form-result">{{ formSubmitMessage }}</div>
    </form>
  </main>
</template>

<script>
import { ref, computed } from 'vue';
const timeOutHandler = isLoading => {
  return () => {
    isLoading.value = false;
  };
};

const readForm = formTarget => {
  let data = {};
  let div = document.createElement('div');

  // sanitize the form data
  for (let elem of formTarget) {
    div.innerText = elem.value;
    if (elem.name) {
      data[elem.name] = div.innerHTML;
    }
  }

  return data;
};

export default {
  name: 'Contact',
  setup(props) {
    const isLoading = ref(false);
    const formSubmitMessage = ref('');
    const timeoutVal = (process.env.NODE_ENV === 'development' ? 3 : 30) * 1000;

    const handleFormSubmit = async event => {
      const data = readForm(event.target);

      try {
        isLoading.value = true;
        const url = `/api/contact?token=${process.env.VUE_APP_CONTACT_TOKEN}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        const res = await response.json();
        formSubmitMessage.value = res.message;
        setTimeout(timeOutHandler(isLoading), timeoutVal);
      } catch (err) {
        formSubmitMessage.value = `Error: ${err.message}`;
        setTimeout(timeOutHandler(isLoading), timeoutVal);
      }
    };

    return {
      handleFormSubmit,
      isLoading,
      formSubmitMessage
    };
  }
};
</script>
<style scoped>
form {
  display: block;
  margin: 3rem auto;
}
.form-input {
  display: block;
}
label {
  display: inline-block;
  text-align: left;
  width: 60px;
  padding-right: 3rem;
}
</style>
