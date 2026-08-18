<script setup>
import { reactive, ref } from 'vue'

const form = reactive({
  name: '',
  email: '',
  message: '',
  website: '',
})

const formStarted = Date.now()

const isSending = ref(false)
const status = ref('')

async function submitForm() {
  status.value = ''

  const formData = new FormData()

  formData.append('name', form.name)
  formData.append('email', form.email)
  formData.append('message', form.message)
  formData.append('website', form.website)
  formData.append('form_started', String(formStarted))

  try {
    isSending.value = true

    const response = await fetch('/api/contact.php', {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()

    if (!response.ok || !data.ok) {
      throw new Error(data.error || 'Unable to send message.')
    }

    status.value = 'success'

    form.name = ''
    form.email = ''
    form.message = ''
    form.website = ''
  } catch (error) {
    console.error(error)
    status.value = 'error'
  } finally {
    isSending.value = false
  }
}
</script>

<template>
  <section id="contact" class="section container">
    <div class="contact-heading">
      <h2>Get In Touch</h2>
      <p>Have a project in mind? Let's discuss how we can work together.</p>
      <div class="contact-underline"></div>
    </div>

    <div class="contact-grid">
      <div class="contact-left">
        <div class="contact-card">
          <h3>Contact Information</h3>

          <a class="contact-item" href="mailto:NelsonCanada23@gmail.com">
            <span class="contact-icon">
              <i class="fa-regular fa-envelope"></i>
            </span>

            <span>
              <strong>Email Me</strong>
              <small>NelsonCanada23@gmail.com</small>
            </span>
          </a>

          <a
            class="contact-item"
            href="https://github.com/NelsonLlanes"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="contact-icon">
              <i class="fa-brands fa-linkedin-in"></i>
            </span>

            <span>
              <strong>GitHub</strong>
              <small>https://github.com/NelsonLlanes</small>
            </span>
          </a>
        </div>

        <div class="freelance-card">
          <h3>Freelance Status</h3>

          <div class="availability">
            <span class="availability-dot"></span>
            <strong>Available for new projects</strong>
          </div>
        </div>
      </div>

      <form class="contact-form" @submit.prevent="submitForm">
        <h3>Send a Message</h3>

        <div class="form-group">
          <label for="contact-name">NAME</label>
          <input
            id="contact-name"
            v-model.trim="form.name"
            type="text"
            name="name"
            placeholder="Your name"
            autocomplete="name"
            maxlength="100"
            required
          />
        </div>

        <div class="form-group">
          <label for="contact-email">EMAIL</label>
          <input
            id="contact-email"
            v-model.trim="form.email"
            type="email"
            name="email"
            placeholder="Your email"
            autocomplete="email"
            maxlength="254"
            required
          />
        </div>

        <div class="form-group">
          <label for="contact-message">MESSAGE</label>
          <textarea
            id="contact-message"
            v-model.trim="form.message"
            name="message"
            placeholder="Your message"
            rows="5"
            maxlength="3000"
            required
          ></textarea>
        </div>

        <div class="honeypot" aria-hidden="true">
          <label for="contact-website">Website</label>
          <input
            id="contact-website"
            v-model="form.website"
            type="text"
            name="website"
            tabindex="-1"
            autocomplete="off"
          />
        </div>

        <button class="contact-submit" type="submit" :disabled="isSending">
          {{ isSending ? 'Sending...' : 'Send Message' }}
        </button>

        <p v-if="status === 'success'" class="form-status form-status--success">
          Message sent successfully.
        </p>

        <p v-if="status === 'error'" class="form-status form-status--error">
          Unable to send your message. Please try again.
        </p>
      </form>
    </div>
  </section>
</template>

<style scoped>
#contact {
  padding-top: 6rem;
  padding-bottom: 6rem;
}

.contact-heading {
  text-align: center;
  margin-bottom: 2.5rem;
}

.contact-heading h2 {
  margin: 0;
  color: #ff5b4d;
  font-size: clamp(2rem, 4vw, 2.6rem);
  font-weight: 800;
}

.contact-heading p {
  margin: 1rem 0 0;
  color: #c2c8d3;
}

.contact-underline {
  width: 50px;
  height: 4px;
  margin: 1.25rem auto 0;
  background: #ff5b4d;
  border-radius: 999px;
}

.contact-grid {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 1.25rem;
  max-width: 900px;
  margin: 0 auto;
  align-items: start;
}

.contact-left {
  display: grid;
  gap: 1rem;
}

.contact-card,
.contact-form {
  background: #121722;
  border: 1px solid #303642;
  border-radius: 18px;
}

.contact-card {
  padding: 1.25rem;
}

.contact-card h3,
.contact-form h3,
.freelance-card h3 {
  margin: 0 0 1rem;
  font-size: 1rem;
  font-weight: 700;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.75rem;

  color: #fff;
  text-decoration: none;

  background: #0f141e;
  border: 1px solid #2b313d;
  border-radius: 12px;
}

.contact-item + .contact-item {
  margin-top: 0.1rem;
}

.contact-icon {
  display: grid;
  place-items: center;
  flex: 0 0 36px;
  width: 36px;
  height: 36px;

  color: #ff5b4d;
  background: rgba(255, 91, 77, 0.1);
  border: 1px solid rgba(255, 91, 77, 0.35);
  border-radius: 10px;
}

.contact-item span:last-child {
  display: grid;
}

.contact-item strong {
  font-size: 0.9rem;
}

.contact-item small {
  margin-top: 0.15rem;
  color: #b9c2d1;
  font-size: 0.75rem;
}

.freelance-card {
  padding: 1.25rem;
  color: #0a0e16;
  background: #f26050;
  border-radius: 18px;
}

.availability {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.9rem;
}

.availability-dot {
  width: 13px;
  height: 13px;
  background: #fff;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
}

.contact-form {
  display: grid;
  gap: 1rem;
  padding: 1.25rem;
}

.form-group {
  display: grid;
}

.form-group label {
  margin-bottom: 0.3rem;
  color: #ff5b4d;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.form-group input,
.form-group textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 0.8rem 0;

  font: inherit;
  font-size: 0.85rem;
  color: #fff;

  background: transparent;
  border: 0;
  border-bottom: 1px solid #3b424f;
  border-radius: 0;
  outline: none;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #667085;
}

.form-group input:focus,
.form-group textarea:focus {
  border-bottom-color: #ff5b4d;
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.contact-submit {
  width: 100%;
  margin-top: 0.25rem;
  padding: 0.8rem 1rem;

  font: inherit;
  font-weight: 600;
  color: #090d14;

  background: #ff5b4d;
  border: 0;
  border-radius: 10px;

  cursor: pointer;
}

.contact-submit:hover {
  filter: brightness(1.05);
}

.contact-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-status {
  margin: 0;
  font-size: 0.8rem;
}

.form-status--success {
  color: #68d391;
}

.form-status--error {
  color: #ff5b4d;
}

.honeypot {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

@media (max-width: 768px) {
  #contact {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }

  .contact-heading {
    margin-bottom: 2rem;
  }

  .contact-grid {
    grid-template-columns: 1fr;
    max-width: 550px;
  }
}

@media (max-width: 480px) {
  #contact {
    padding-top: 3.5rem;
    padding-bottom: 3.5rem;
  }

  .contact-card,
  .contact-form,
  .freelance-card {
    border-radius: 14px;
  }

  .contact-item small {
    overflow-wrap: anywhere;
  }
}
</style>
