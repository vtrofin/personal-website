<template>
  <section>
    <h1>Contact me</h1>
    <p tabindex="0">
      Have a project you want to discuss? Leave a message and I'll be in touch
      with you shortly.
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
        <span class="input-label" @click.stop.prevent="handleSpanFocus"
          >Name</span
        >
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
        <span class="input-label" @click.stop.prevent="handleSpanFocus"
          >Email</span
        >
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
        <span class="input-label" @click.stop.prevent="handleSpanFocus"
          >Subject</span
        >
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
        <span class="input-label" @click.stop.prevent="handleSpanFocus"
          >Message</span
        >
      </div>
      <span class="required-label">*Required</span>

      <button
        type="submit"
        :disabled="templateData.isLoading"
        aria-label="Send the email message"
      >
        <SpinnerComponent text="Sending..." v-if="loading" />
        <span v-else>Submit</span>
      </button>
      <div
        :class="templateData.messageClass"
        :v-if="templateData.formSubmitMessage"
      >
        <AlertComponent
          width="16px"
          color="#f28482"
          v-if="templateData.messageClass.includes('error')"
        />
        <TickComponent
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

<script lang="ts">
import { reactive, ref, defineComponent } from "vue";
import TickComponent from "@components/contact/tick.vue";
import AlertComponent from "@components/contact/alert.vue";
import SpinnerComponent from "@components/spinner/index.vue";

type TemplateData = {
  isLoading: boolean;
  formSubmitMessage: string;
  messageClass: string;
  inputModifierClass: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
}

const timeOutHandler = (reactiveVal: TemplateData) => {
  return () => {
    reactiveVal.isLoading = false;
    reactiveVal.messageClass = "form-result";
    reactiveVal.formSubmitMessage = "";
  };
};

const readForm = (formTarget: HTMLFormElement | null) => {
  let data: { [key: string]: string } = {};
  let div = document.createElement("div");

  if (!formTarget) {
    return data
  }


  // sanitize the form data
  for (let elem of formTarget) {
    const inputElement = elem as HTMLInputElement

    div.innerText = inputElement.value;
    if (inputElement.name) {
      data[inputElement.name] = div.innerHTML;
    }
  }

  return data;
};

const toggleFocus = (target: HTMLInputElement | HTMLTextAreaElement, templateData: TemplateData) => {
  const value = target?.value;
  const targetName = target?.name as keyof TemplateData['inputModifierClass'];

  if (!targetName) {
    throw new Error("Failed to get target input");
  }

  const localState = templateData?.inputModifierClass?.[targetName];
  if (typeof localState !== "string") {
    throw new Error("Failed to get input class");
  }
  templateData.inputModifierClass[targetName] =
    localState === "focused" && !value ? "" : "focused";
};

export default defineComponent({
  name: "ContactPage",
  components: { TickComponent, AlertComponent, SpinnerComponent },
  setup() {
    const timeoutVal = (import.meta.env.NODE_ENV === "development" ? 3 : 30) * 1000;
    const templateData = reactive<TemplateData>({
      isLoading: false,
      formSubmitMessage: "",
      messageClass: "form-result",
      inputModifierClass: { name: "", email: "", subject: "", message: "" },
    });
    const loading = ref(false);

    const handleFormSubmit = async (event: Event) => {
      loading.value = true;
      const data = readForm(event.target as HTMLFormElement);

      try {
        templateData.isLoading = true;
        const url = `/api/contact?token=${import.meta.env.VITE_APP_CONTACT_TOKEN}`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const res = await response.json();
        templateData.formSubmitMessage = res.message || "";
        templateData.messageClass = `form-result ${res && res.response === "error" ? "error" : "success"
          }`;
        loading.value = false;
        setTimeout(timeOutHandler(templateData), timeoutVal);
      } catch (err) {
        templateData.formSubmitMessage = `Error: ${err instanceof Error ? err.message : err}`;
        templateData.messageClass = "form-result error";
        loading.value = false;
        setTimeout(timeOutHandler(templateData), timeoutVal);
      }
    };

    const toggleInputFocus = (event: FocusEvent) => {
      const target = event?.target as HTMLInputElement | HTMLTextAreaElement;
      toggleFocus(target, templateData);
    };

    const handleSpanFocus = (event: MouseEvent) => {
      const target = event?.currentTarget as HTMLElement;
      const parentEl = (target?.parentNode || target?.parentElement) as HTMLElement;
      const inputEl = (target?.previousSibling || target?.previousElementSibling) as HTMLElement;

      if (typeof parentEl?.className !== "string") {
        throw new Error("Failed to get span element class");
      }

      if (!parentEl.className.includes("focused")) {
        setTimeout(() => inputEl.focus(), 0);
      }
    };

    const getClassName = (baseClass: string, modifier: keyof TemplateData['inputModifierClass']) => {
      return (
        baseClass +
        (templateData?.inputModifierClass?.[modifier]
          ? " " + templateData.inputModifierClass[modifier]
          : "")
      );
    };

    return {
      handleFormSubmit,
      templateData,
      toggleInputFocus,
      handleSpanFocus,
      getClassName,
      loading,
    };
  },
});
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

.input-container textarea+.input-label {
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

.input-container+.required-label,
textarea+.required-label {
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

button[type="submit"] {
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

button[type="submit"]:hover,
button[type="submit"]:focus {
  filter: brightness(0.9);
  transition: all 0.3s ease-in;
}

button[type="submit"]:disabled {
  filter: brightness(1.1);
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
