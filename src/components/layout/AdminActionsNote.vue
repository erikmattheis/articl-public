<template>
  <ul class="note-actions admin">
    <li>
      <a
        href="#"
        @click.prevent="$emit('edit-mode')">
        edit
      </a>
    </li>
    <li>
      <router-link :to="{ name: 'deleteNote' }">
        delete
      </router-link>
    </li>
  </ul>
</template>

<script setup>

defineProps({
  id: {
    type: String,
    default: '',
  },
  fullText: {
    type: String,
    default: '',
  },
  slug: {
    type: String,
    default: '',
  },
});

defineEmits(['edit-mode']);

</script>
