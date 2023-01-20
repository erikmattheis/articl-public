<template>
  <li class="container">
    <router-link
      class="box"
      :to="{ name: tabName, params: { slug: category.slug } }">
      {{ category.title }}
    </router-link>
    <category-actions
      v-if="isLoggedIn"
      :id="category.id"
      class="box"
      :slug="category.slug" />
  </li>
</template>

<script>
import { mapGetters } from 'vuex';

import CategoryActions from '@/components/layout/CategoryActions.vue';

export default {
  name: 'CategoriesListItem',

  components: {
    CategoryActions,
  },
  props: {
    category: {
      type: Object,
      default: undefined,
    },
    treeLevel: {
      type: Number,
      default: 0,
    },
    tabName: {
      type: String,
      default: '',
    },
    slug: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      TabName: '',
    };
  },

  computed: {
    ...mapGetters({
      isLoggedIn: 'tokens/isLoggedIn',
    }),
  },

  methods: {

  },
};

</script>

<style scoped lang="scss">
.container {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: minmax(200px, 1fr) 200px;

  color: #444;
}

li {
  width:100%;
  padding:

  a {
    cursor: pointer;
  }
}

li:hover {
  background-color: var(--primary-nav-background);
}

</style>
