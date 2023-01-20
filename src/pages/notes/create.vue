<template>
  <section>
    <h3 v-if="!success">
      {{ formAction }} note
    </h3>
    <h1 v-else>
      Success
    </h1>
    <template v-if="!isLoading">
      <form v-if="!success">
        <label for="fullText">Note <textarea
          id="fullText"
          v-model="fullText"
          name="fullText"
          autocomplete="off" />
        </label>
        <button
          type="button"
          :aria-busy="buttonDisabled"
          @click.prevent="submitForm(id)">
          {{ !id? "Create":"Edit" }} Note
        </button>
      </form>
      <template v-else>
        <card-notification success-message="Success" />
        <a
          href
          @click="$router.go()"
          @keyup.enter="$router.go()">Create another note</a>
      </template>
    </template>
    <transition
      name="fade"
      mode="out-in">
      <loading-placeholder v-if="isLoading" />
    </transition>
  </section>
</template>

<script>
import cardNotification from '@/components/ui/CardNotification.vue';
import LoadingPlaceholder from '@/components/ui/LoadingPlaceholder.vue';
import { setTitleAndDescription } from '@/services/htmlMetaService';

export default {
  name: 'EditNoteComponent',
  components: {
    LoadingPlaceholder,
    cardNotification,
  },
  data: () => ({
    fullText: '',
  }),
  mounted() {
    this.formAction = this.id ? 'Edit' : 'Create';

    if (!this.id) {
      this.slug = this.$route.params.slug;

      this.isLoading = false;
    } else {
      this.getCurrentNote(this.id);
    }

    setTitleAndDescription({
      title: this.formAction,
    });
  },
  methods: {
    async getCurrentNote(id) {
      try {
        this.isLoading = true;

        const result = await this.getNote(id);

        Object.assign(this, result.data);

        this.isLoading = false;
      } catch (error) {
        this.$store.dispatch('errors/setError', error);
      }
    },
    resetFormErrors() {
      this.success = null;

      this.result = null;

      this.errorMessage = '';
    },
    checkForm() {
      this.resetFormErrors();

      let passed = true;

      if (this.fullText === '') {
        this.errorMessage = 'Please enter some text.';

        passed = false;
      }

      return passed;
    },
    async submitForm(id) {
      try {
        this.resetFormErrors();

        if (this.checkForm() === true) {
          this.buttonDisabled = true;

          const verb = id ? 'PUT' : 'POST';
          const result = await this.$http({
            method: verb,
            url: `/notes/${id}`,
            data: {
              authors: this.authors,
              fullText: this.fullText,
              slug: this.slug,
            },
          });

          this.success = true;

          Object.assign(this, result.data);
        } else {
          this.$store.dispatch('errors/setError', this.errorMessage);
        }
      } catch (error) {
        this.$store.dispatch('errors/setError', error);
      } finally {
        this.buttonDisabled = false;
      }
    },

    async getNote(id) {
      return this.$http({
        method: 'GET',
        url: `/notes/${id}`,
      });
    },
  },
};
</script>

<style scoped>
form input.another {
  padding-right: 4.6 rem;
}

form input.another button {
  position: absolute;
  top: 0;
  right: 0;
  width: 4.4rem;
}
</style>
