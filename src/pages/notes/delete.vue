<template>
  <article>
    <h1>Delete Note{{ slug }}</h1>
    <p>Really delete note that starts "{{ fullText.substring(0,40) }}..."?</p>
    <form>
      <button
        v-if="!!id"
        @click.prevent="deleteNote()">
        Delete
      </button>
    </form>
  </article>
</template>

<script>
export default {
  name: 'DeleteNote',
  props: {
    fullText: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
    slug: {
      type: String,
      default: '',
    },
  },
  data: () => ({}),
  mounted() {

  },
  methods: {
    async deleteNote() {
      try {
        this.buttonDisabled = true;

        await this.submitDelete(this.id);

        this.$router.push({ name: 'categoryPage', params: { slug: this.slug } });
      } catch (error) {
        this.$store.dispatch('errors/setError', error);
      } finally {
        this.buttonDisabled = false;
      }
    },
    async submitDelete(id) {
      return this.$http({
        method: 'DELETE',
        url: '/notes',
        data: {
          id,
        },
      });
    },
  },
};
</script>
