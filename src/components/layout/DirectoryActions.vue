<template>
  <div class="admin">
    <router-link
      :to="{ name: 'createCategoryPage', query: { parentSlug: $route.params.slug ? $route.params.slug : '0' } }"
      role="button">
      New Category Here
    </router-link>

    <router-link
      :to="{ name: 'createArticlPage', query: { slug: $route.params.slug ? $route.params.slug : '0' } }"
      role="button">
      New Articl Here
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'DirectoryActions',
};
</script>
