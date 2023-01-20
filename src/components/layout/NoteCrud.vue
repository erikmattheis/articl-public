<template>
  <section class="admin">
    <template v-if="!isLoading">
      <form>
        <label for="fullText">Note
          <textarea
            id="fullText"
            v-model="fullText"
            name="fullText"
            autocomplete="off" />
        </label>

        <button
          type="button"
          :aria-busy="buttonDisabled"
          @click.prevent="submitForm(id)">
          {{ !id ? "Create" : "Edit" }} Note
        </button>
      </form>
    </template>
    <transition
      name="fade"
      mode="out-in">
      <loading-placeholder v-if="isLoading" />
    </transition>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

import LoadingPlaceholder from '@/components/ui/LoadingPlaceholder.vue';

export default {
  name: 'NoteCrudComponent',
  components: {
    LoadingPlaceholder,
  },
  emits: ['view-mode'],
  data: () => ({
    fullText: '',
    buttonDisabled: false,
    formAction: undefined,
    isLoading: true,
    id: undefined,
  }),
  computed: {
    ...mapGetters({
      isLoggedIn: 'tokens/isLoggedIn',
    }),
  },
  mounted() {
    this.formAction = this.id ? 'Edit' : 'Create';

    if (!this.id) {
      this.isLoading = false;
    } else {
      this.getCurrentNote(this.id);
    }
  },
  methods: {
    async getCurrentNote(id) {
      try {
        this.isLoading = true;

        const result = await this.getNote(id);

        this.fullText = result.data.fullText;
      } catch (error) {
        this.$store.dispatch('errors/setError', error);
      } finally {
        this.isLoading = false;
      }
    },
    resetFormErrors() {
      this.errorMessage = '';
    },
    checkForm() {
      this.resetFormErrors();

      let passed = true;

      if (this.title === '') {
        this.errorMessage = 'Please enter a title.';

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

          await this.$http({
            method: verb,
            url: `/notes/${id}`,
            data: {
              fullText: this.fullText,
              slug: this.slug,
            },
          });

          this.$emit('view-mode', id);
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
