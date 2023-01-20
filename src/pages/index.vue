<template>
  <article v-if="!isLoading">
    <h3>Category</h3>
    <h2>{{ title }}</h2>

    <tab-categories />

    <directory-actions
      v-if="isLoggedIn" />
  </article>

  <loading-placeholder v-else />
</template>

<script>
import { mapGetters } from 'vuex';

import DirectoryActions from '@/components/layout/DirectoryActions.vue';
import TabCategories from '@/components/layout/TabCategories.vue';
import LoadingPlaceholder from '@/components/ui/LoadingPlaceholder.vue';
import { setTitleAndDescription } from '@/services/htmlMetaService';

export default {
  name: 'CategoryPage',
  components: {
    LoadingPlaceholder,
    TabCategories,
    DirectoryActions,
  },
  data() {
    return {
      isLoading: true,
      title: '',
    };
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'tokens/isLoggedIn',
      treeLevel: 'categoryPages/treeLevel',
      articls: 'categoryPages/articls',
      articlTypes: 'categoryPages/articlTypes',
      categories: 'categoryPages/categories',
      notes: 'categoryPages/notes',
    }),
  },
  watch: {
    '$route.params.slug': {
      handler() {
        this.updateData();
      },
      immediate: true,
    },
  },
  methods: {
    async updateData() {
      try {
        this.isLoading = true;

        const results = await this.fetchData();

        if (results.categories?.length) {
          this.$store.dispatch('categoryPages/categories', results.categories);
        } else {
          this.$store.dispatch('categoryPages/categories', []);
        }

        if (results.breadcrumbs?.length) {
          this.$store.dispatch('categoryPages/breadcrumbs', results.breadcrumbs);
        } else {
          this.$store.dispatch('categoryPages/breadcrumbs', []);
        }

        if (results.articls) {
          this.$store.dispatch('categoryPages/articls', results.articls);
          this.$store.dispatch('categoryPages/articlTypes', results.articlTypes);
        } else {
          this.$store.dispatch('categoryPages/articls', []);
          this.$store.dispatch('categoryPages/articlTypes', []);
        }

        if (results.notes?.length) {
          this.$store.dispatch('categoryPages/notes', results.notes);
        }

        this.title = results.category[0]?.title;

        const description = results.category[0]?.description;

        setTitleAndDescription({
          title: this.title,
          description,
        });
      } catch (error) {
        this.$store.dispatch('errors/setError', error);
      } finally {
        this.isLoading = false;
      }
    },

    async fetchData() {
      const result = await this.$http({
        method: 'GET',
        url: '/resource/0',
      });

      return {
        categories: result.data.categories,
        category: result.data.category,
        notes: result.data.notes,
      };
    },

  },
};
</script>

<style
  lang="scss"
  scoped
>
pre {
  overflow: auto;
  word-break: break-all;
  white-space: pre-wrap;
}
</style>
