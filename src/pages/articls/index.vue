<template>
  <article>
    <h1>Search Articls</h1>
    <div class="grid">
      <the-articls-form-search />
      <div>
        <the-articls-search-params />
      </div>
    </div>
    <articls-list />
  </article>
</template>

<script>
import TheArticlsFormSearch from '@/components/layout/TheArticlsSearchForm.vue';
import TheArticlsSearchParams from '@/components/layout/TheArticlsSearchParams.vue';

export default {
  name: 'ArticlsSearch',
  components: {
    TheArticlsFormSearch,
    TheArticlsSearchParams,
  },
};
</script>
