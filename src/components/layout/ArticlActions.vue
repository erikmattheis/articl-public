<template>
  <router-link
    :to="{ name: 'editArticl', params: { id } }">
    edit
  </router-link>

  <router-link
    :to="{ name: 'deleteArticl', params: { id, title } }">
    delete
  </router-link>

  <span class="handle">
    <a
      href="#"><div class="sr">Reorder articl</div>
      <vue-feather
        size="1rem"
        type="move"
        aria-label="Drag to reorder" />
    </a>
  </span>
</template>

<script>
import VueFeather from 'vue-feather';

export default {
  name: 'ArticlActions',
  components: {
    VueFeather,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      expanded: false,
    };
  },
};
</script>

<style scoped>
.grid {
  white-space:nowrap;
}

.grid a {
  display:inline-block;

}
</style>
