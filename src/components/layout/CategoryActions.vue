<template>
  <div class="row-admin-box">
    <router-link
      role="button"
      :to="{ name: 'editCategory', params:{id}}">
      <small>edit</small>
    </router-link>

    <router-link
      role="button"
      :to="{ name: 'deleteCategory', params:{slug,title}}">
      <small>delete</small>
    </router-link>

    <a
      role="button"
      class="handle"
      href="#"><div class="sr">Reorder category</div>
      <vue-feather
        size="0.7rem"
        type="move"
        aria-label="Drag to reorder" />
    </a>
  </div>
</template>

<script>
import VueFeather from 'vue-feather';

export default {
  name: 'CategoryActions',
  components: {
    VueFeather,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
    slug: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    expanded: false,
  }),
  computed: {

  },
};
</script>

<style scoped lang="scss">
a {
  align-self: center;
  justify-self: center;
  border:0;
}
</style>
