<template>
  <section>
    <h1>Contact me</h1>
    <p tabindex="0">
      Have a project you want to discuss? Leave a message and I'll be in touch with you shortly
    </p>
    <form method="post" @submit.prevent="handleFormSubmit">
      <label for="name">Name</label>
      <div :class="getClassName('input-container', 'name')">
        <input
          id="name"
          type="text"
          name="name"
          @focus="toggleInputFocus"
          @blur="toggleInputFocus"
        />
        <span class="input-label" @click.stop.prevent="handleSpanFocus">Name</span>
      </div>
      <label for="email">Email</label>
      <div :class="getClassName('input-container', 'email')">
        <input
          id="email"
          type="email"
          name="email"
          :required="true"
          @focus="toggleInputFocus"
          @blur="toggleInputFocus"
        />
        <span class="input-label" @click.stop.prevent="handleSpanFocus">Email</span>
      </div>
      <span class="required-label">*Required</span>

      <label for="subject">Subject</label>
      <div :class="getClassName('input-container', 'subject')">
        <input
          id="subject"
          type="text"
          name="subject"
          @focus="toggleInputFocus"
          @blur="toggleInputFocus"
        />
        <span class="input-label" @click.stop.prevent="handleSpanFocus">Subject</span>
      </div>

      <label for="message">Message*</label>
      <div :class="getClassName('input-container', 'message')">
        <textarea
          id="message"
          name="message"
          rows="5"
          :required="true"
          @focus="toggleInputFocus"
          @blur="toggleInputFocus"
        />
        <span class="input-label" @click.stop.prevent="handleSpanFocus">Message</span>
      </div>
      <span class="required-label">*Required</span>

      <button type="submit" :disabled="templateData.isLoading" aria-label="Send the email message">
        <!-- <span>Submit</span> -->
        <Spinner text="Sending..." />
      </button>
      <div :class="templateData.messageClass" :v-if="templateData.formSubmitMessage">
        <Alert width="16px" color="#f28482" v-if="templateData.messageClass.includes('error')" />
        <Tick
          width="16px"
          color="#84a59d"
          v-else-if="templateData.messageClass.includes('success')"
        />
        {{ templateData.formSubmitMessage }}
      </div>
      <div />
      <div />
    </form>
  </section>
</template>

<script>
import { reactive } from 'vue';
import Tick from '../components/contact/tick.vue';
import Alert from '../components/contact/alert.vue';
import Spinner from '../components/spinner';

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

const toggleFocus = (target, templateData, eventType) => {
  const value = target?.value;
  const targetName = target?.name;

  if (!targetName) {
    throw new Error('Failed to get target input');
  }

  const localState = templateData?.inputModifierClass?.[targetName];
  if (typeof localState !== 'string') {
    throw new Error('Failed to get input class');
  }
  templateData.inputModifierClass[targetName] = localState === 'focused' && !value ? '' : 'focused';
};

export default {
  name: 'Contact',
  components: { Tick, Alert, Spinner },
  setup() {
    const timeoutVal = (process.env.NODE_ENV === 'development' ? 3 : 30) * 1000;
    const templateData = reactive({
      isLoading: false,
      formSubmitMessage: '',
      messageClass: 'form-result',
      inputModifierClass: { name: '', email: '', subject: '', message: '' },
    });

    const handleFormSubmit = async event => {
      const data = readForm(event.target);

      try {
        templateData.isLoading = true;
        const url = `/api/contact?token=${process.env.VUE_APP_CONTACT_TOKEN}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
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

    const toggleInputFocus = event => {
      const target = event?.target;
      toggleFocus(target, templateData, event?.type);
    };

    const handleSpanFocus = event => {
      const target = event?.currentTarget;
      const parentEl = target?.parentNode || target?.parentElement;
      const inputEl = target?.previousSibling || target?.previousElementSibling;

      if (typeof parentEl?.className !== 'string') {
        throw new Error('Failed to get span element class');
      }

      if (!parentEl.className.includes('focused')) {
        setTimeout(() => inputEl.focus(), 0);
      }
    };

    const getClassName = (baseClass, modifier) => {
      return (
        baseClass +
        (templateData?.inputModifierClass?.[modifier]
          ? ' ' + templateData.inputModifierClass[modifier]
          : '')
      );
    };

    return {
      handleFormSubmit,
      templateData,
      toggleInputFocus,
      handleSpanFocus,
      getClassName,
    };
  },
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
.input-container {
  flex-grow: 1;
  flex-basis: 100%;
}
label {
  display: none;
  text-align: left;
  font-size: 0.9rem;
}
.required-label {
  font-size: 0.8rem;
  color: var(--gray);
  text-align: left;
}

.input-container {
  position: relative;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}
.input-container input,
.input-container textarea {
  width: 100%;
  box-sizing: border-box;
  line-height: 1.2rem;
  font-family: inherit;
}
.input-container .input-label {
  position: absolute;
  color: rgb(91, 112, 131);
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  font-size: 1rem;
  font-weight: 400;
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.input-container textarea + .input-label {
  top: 1rem;
}

.input-container.focused .input-label {
  color: var(--black);
  font-size: 0.7rem;
  top: 0%;
  transform: translateY(0%);
  pointer-events: none;
}

.input-container.focused input,
.input-container.focused textarea {
  padding-top: 0.8rem;
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
}

.input-container + .required-label,
textarea + .required-label {
  margin-top: -0.7rem;
  margin-bottom: 1rem;
}

textarea {
  resize: vertical;
  min-height: 70px;
}

input:focus,
textarea:focus {
  border-color: var(--black);
}
@media (hover: hover) {
  input:hover,
  textarea:hover {
    border-color: var(--black);
  }
}

button[type='submit'] {
  padding: 0.75rem 1.5rem;
  margin-top: 1rem;
  align-self: center;
  font-size: 1.2rem;
  font-weight: 700;
  background-color: var(--yellow);
  color: var(--white);
  border: none;
  border-radius: var(--base-border);
  transition: all 0.3s ease-out;
  text-transform: capitalize;
  cursor: pointer;
  outline: none;
}

button[type='submit']:hover,
button[type='submit']:focus {
  filter: brightness(0.9);
  transition: all 0.3s ease-in;
}

button[type='submit']:disabled {
  background-color: var(--light-yellow);
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
  border: 1px solid var(--light-green);
}
.form-result.error {
  border: 1px solid var(--red);
}

.form-result svg {
  margin-bottom: -1px;
}
</style>
