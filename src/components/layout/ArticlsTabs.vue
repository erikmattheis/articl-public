<template>
  <ul class="nav-tabs">
    <router-link
      v-slot="{ isActive, navigate }"
      custom
      :to="{ name: 'TabArticls'}">
      <li :class="{ 'active': isActive }">
        <a
          href
          @click.prevent="navigate()"
          @keyup.enter.prevent="navigate()">
          Articls
        </a>
      </li>
    </router-link>

    <router-link
      v-slot="{ isActive, navigate }"
      custom
      :to="{ 'name': 'TabNotes' }">
      <li :class="{ 'active': isActive }">
        <a
          href
          @click.prevent="navigate()"
          @keyup.enter.prevent="navigate()">
          Notes
        </a>
      </li>
    </router-link>

    <router-link
      v-slot="{ isActive, navigate }"
      custom
      :to="{ 'name': 'TabBlogs' }">
      <li :class="{ 'active': isActive }">
        <a
          href
          @click.prevent="navigate()"
          @keyup.enter.prevent="navigate()">
          Blogs
        </a>
      </li>
    </router-link>

    <router-link
      v-slot="{ isActive, navigate }"
      custom
      :to="{ 'name': 'TabQuestionsAnswers' }">
      <li :class="{ 'active': isActive }">
        <a
          href
          @click.prevent="navigate()"
          @keyup.enter.prevent="navigate()">
          Q&amp;A
        </a>
      </li>
    </router-link>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ArticlsTabs',
  data() {
    return {
      slug: '',
    };
  },
  computed: {
    ...mapGetters({
      treeLevel: 'categoryPages/treeLevel',
      articlTypes: 'categoryPages/articlTypes',
    }),
  },
  methods: {

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
