<template>
  <nav aria-label="breadcrumb">
    <ul>
      <li>
        <router-link
          :to="{ name: 'homePage'}">
          Home
        </router-link>
      </li>
      <li
        v-for="(breadcrumb, index) in breadcrumbs"
        :key="breadcrumb">
        <router-link
          v-if="index !== breadcrumbs.length - 1"
          :to="{ name: index < 2 ? 'TabCategories':'TabArticls', params: { slug : breadcrumb.slug } }">
          {{ breadcrumb.title }}
        </router-link>
        <span v-else> {{ breadcrumb.title }}</span>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TheBreadcrumbs',
  computed: {
    ...mapGetters({
      breadcrumbs: 'categoryPages/breadcrumbs',
    }),
  },
};
</script>
