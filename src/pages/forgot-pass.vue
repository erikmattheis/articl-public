<template>
  <article>
    <h1>Forgot password</h1>
    <form>
      <input
        type="hidden"
        name="username"
        autocomplete="username">
      <label for="email">Email
        <input
          id="email"
          v-model="email"
          name="email"
          type="text"
          autocomplete="email"></label>
      <button
        id="reset"
        type="submit"
        :aria-busy="buttonDisabled"
        @click.prevent="submitForm()">
        <span v-if="!buttonDisabled">Reset</span>
      </button>
    </form>
    <p v-if="result">
      {{ result }}
    </p>
    <p
      v-if="errorMessage"
      class="error">
      {{ errorMessage }}
    </p>
  </article>
</template>

<script>
import validateEmail from '@/services/emailValidationService';
import { setTitleAndDescription } from '@/services/htmlMetaService';

export default {
  name: 'ForgotPass',
  data: () => ({
    email: null,
    emailInvalid: null,
    errorMessage: '',
    buttonDisabled: false,
    result: null,
  }),
  mounted: () => {
    setTitleAndDescription({
      title: 'Forgot pass',
    });
  },
  methods: {
    resetForm() {
      this.emailInvalid = null;

      this.result = null;
    },
    checkForm() {
      if (!this.email || !validateEmail.validateEmail(this.email)) {
        this.errorMessage = 'Please enter a valid email address';

        return false;
      }

      return true;
    },
    async submitForm() {
      try {
        this.resetForm();

        if (this.checkForm() === true) {
          this.buttonDisabled = true;

          const result = await this.$http({
            method: 'POST',
            url: '/auth/forgot-password',
            data: {
              email: this.email,
            },
          });

          this.$store.dispatch('modals/setSuccessTitle', 'Email sent');

          this.$store.dispatch('modals/setSuccessMessage', 'Check your email for instructions how to reset your password.');

          if (result?.data?.message) {
            this.result = result.data.message;
          } else {
            this.result = result.response;
          }
        } else {
          this.$store.dispatch('errors/setError', this.errorMessage);
        }
      } catch (error) {
        this.$store.dispatch('errors/setError', error);
      } finally {
        this.buttonDisabled = false;
      }
    },
  },
};
</script>
