<template>
  <article>
    <h1>Delete Articl</h1>
    <p>Really delete "{{ title }}"?</p>
    <form>
      <button
        v-if="!!id"
        :aria-busy="buttonDisabled"
        @click="deleteArticl()">
        Delete
      </button>
    </form>
  </article>
</template>

<script>
export default {
  name: 'DeleteArticl',
  components: {
  },
  props: {
    id: {
      default: () => '',
      type: String,
    },
    title: {
      default: () => '',
      type: String,
    },
  },
  data: () => ({
    buttonDisabled: false,
  }),
  mounted() {

  },
  methods: {
    async deleteArticl() {
      try {
        this.buttonDisabled = true;

        await this.submitDelete(this.id);

        this.$store.dispatch('modals/setSuccessTitle', 'Deletion successful.');

        this.$store.dispatch(
          'modals/setSuccessMessage',
          `The articl "${this.title}" has been permanently deleted.`,
        );
      } catch (error) {
        this.$store.dispatch('errors/setError', error);
      } finally {
        this.buttonDisabled = false;
      }
    },
    async submitDelete(id) {
      return this.$http({
        method: 'DELETE',
        url: '/articls',
        data: {
          id,
        },
      });
    },
  },
};
</script>
