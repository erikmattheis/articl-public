<template>
  <article>
    <h1>Delete Category</h1>
    slug: {{ slug }}
    <p>Really delete "{{ category.title }}"? This will remove {{ categories.length }} descendent categories to be removed from category navigation.</p>
    <form>
      <button
        v-if="!!id"
        :aria-busy="buttonDisabled"
        @click="deleteCategory()">
        Delete
      </button>
    </form>
  </article>
</template>

<script>
export default {
  name: 'DeleteCategory',
  components: {
  },
  data: () => ({
    buttonDisabled: false,
    categories: [],
    slug: '',
  }),
  params: {

  },

  mounted() {
    this.slug = this.$route.params.slug;
    console.log('slug', this.slug);
    this.getCurrentCategory(this.slug);
  },
  methods: {
    async getCurrentCategory(slug) {
      try {
        this.isLoading = true;

        const result = await this.getCategory(slug);
        Object.assign(this, result.data);

        this.isLoading = false;
      } catch (error) {
        this.$store.dispatch('errors/setError', error);
      }
    },
    async getCategory(slug) {
      return this.$http({
        method: 'GET',
        url: `/resource/${slug}`,
      });
    },
    async deleteCategory() {
      try {
        this.buttonDisabled = true;

        await this.submitDelete(this.id);

        this.$store.dispatch('modals/setSuccessTitle', 'Deletion successful.');

        this.$store.dispatch(
          'modals/setSuccessMessage',
          `The category "${this.title}" has been permanently deleted.`,
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
        url: '/categories',
        data: {
          id,
        },
      });
    },
  },
};
</script>
