<template>
  <main>
    <h1>Contact me...</h1>
    <p>...if you can!</p>
    <form method="post" action="#">
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
      <button type="submit">
        Send
      </button>
      <input type="reset" value="Clear" />
    </form>
  </main>
</template>

<script>
// Use vercel serverless to process the request!!
// make a form for the fun of it
export default {
  name: 'Contact',
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
