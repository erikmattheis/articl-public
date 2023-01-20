<template>
  <ul>
    <li
      v-for="note in notes || [] "
      :key="note.fullText">
      <notes-list-item :passed-note="note" />
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex';

import NotesListItem from '@/components/layout/NotesListItem.vue';

export default {
  name: 'NoteList',
  components: {
    NotesListItem,
  },
  props: {
    notes: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    isLoading: true,
    isEditing: false,
    editMode: false,
  }),
  computed: {
    ...mapGetters({
      isLoggedIn: 'tokens/isLoggedIn',
    }),
  },

  methods: {

  },
};
</script>
