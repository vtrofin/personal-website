<template>
  <main>
    <h1>Contact me...</h1>
    <p>...if you can!</p>
    <form method="post" @submit.prevent="handleFormSubmit">
      <label for="name"> Name </label>
      <input id="name" type="text" name="name" />

      <label for="email"> Email* </label>
      <input id="email" type="email" name="email" :required="true" />
      <span class="required-label">*Required</span>

      <label for="subject"> Subject </label>
      <input id="subject" type="text" name="subject" />

      <label for="message"> Message* </label>
      <textarea id="message" name="message" rows="5" :required="true" />
      <span class="required-label">*Required</span>

      <button type="submit" :disabled="templateData.isLoading">
        Send
      </button>
      <div :class="templateData.messageClass" :v-if="templateData.formSubmitMessage">
        <Alert width="16px" color="red" v-if="templateData.messageClass.includes('error')" />
        <Tick
          width="16px"
          color="green"
          v-else-if="templateData.messageClass.includes('success')"
        />
        {{ templateData.formSubmitMessage }}
      </div>
      <div></div>
      <div></div>
    </form>
  </main>
</template>

<script>
import { reactive } from 'vue';
import Tick from '../components/contact/tick.vue';
import Alert from '../components/contact/alert.vue';

const timeOutHandler = reactiveVal => {
  return () => {
    reactiveVal.isLoading = false;
    reactiveVal.messageClass = 'form-result';
    reactiveVal.formSubmitMessage = '';
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
  components: { Tick, Alert },
  setup(props) {
    const timeoutVal = (process.env.NODE_ENV === 'development' ? 3 : 30) * 1000;
    const templateData = reactive({
      isLoading: false,
      formSubmitMessage: '',
      messageClass: 'form-result'
    });

    const handleFormSubmit = async event => {
      const data = readForm(event.target);

      try {
        templateData.isLoading = true;
        const url = `/api/contact?token=${process.env.VUE_APP_CONTACT_TOKEN}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        const res = await response.json();
        templateData.formSubmitMessage = res.message || '';
        templateData.messageClass = `form-result ${
          res && res.response === 'error' ? 'error' : 'success'
        }`;
        setTimeout(timeOutHandler(templateData), timeoutVal);
      } catch (err) {
        templateData.formSubmitMessage = `Error: ${err.message}`;
        templateData.messageClass = 'form-result error';
        setTimeout(timeOutHandler(templateData), timeoutVal);
      }
    };

    return {
      handleFormSubmit,
      templateData
    };
  }
};
</script>
<style scoped>
form {
  max-width: 600px;
  display: flex;
  flex-direction: column;
  margin: 3rem auto;
}
label,
input {
  flex-grow: 1;
  flex-basis: 100%;
}

label {
  text-align: left;
  font-size: 0.9rem;
}
.required-label {
  font-size: 0.8rem;
  color: var(--gray);
  text-align: left;
}

input,
textarea {
  padding: 0.5rem;
  outline: none;
  font-size: 1rem;
  border: 1px solid #ddd;
  transition: border-color 0.3s ease;
  appearance: none;
  font-weight: 500;
  color: var(--black);
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}

input + .required-label,
textarea + .required-label {
  margin-top: -0.7rem;
  margin-bottom: 1rem;
}

textarea {
  resize: vertical;
  min-height: 70px;
}

input:hover,
input:focus,
textarea:hover,
textarea:focus {
  border-color: var(--black);
}

button[type='submit'] {
  padding: 0.75rem 1.5rem;
  margin-top: 1rem;
  align-self: center;
  font-size: 1.2rem;
  font-weight: 700;
  background-color: var(--submit-button);
  color: var(--white);
  border: none;
  border-radius: var(--base-border);
  transition: all 0.3s ease-out;
  text-transform: capitalize;
  cursor: pointer;
  outline: none;
}

button[type='submit']:hover {
  background-color: var(--submit-button-focus);
  transition: all 0.3s ease-in;
}

button[type='submit']:disabled {
  background-color: var(--submit-button-disabled);
  pointer-events: none;
  transition: all 0.3s ease-in;
}

.form-result {
  flex-grow: 1;
  flex-basis: 100%;
  padding: 0.5rem;
  margin-top: 2rem;
  text-align: left;
  transition: all 0.3s ease-out;
}
.form-result.success {
  border: 1px solid var(--submit-message-success);
}
.form-result.error {
  border: 1px solid var(--submit-message-error);
}

.form-result svg {
  margin-bottom: -1px;
}
</style>
