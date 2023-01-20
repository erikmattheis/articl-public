<template>
  <div class="tab-content">
    <h2>Notes</h2>
    <ul>
      <li
        v-for="note in notes || [] "
        :key="note.fullText">
        <notes-list-item :passed-note="note" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import NotesListItem from '@/components/layout/NotesListItem.vue';

export default {
  name: 'TabNotes',
  components: { NotesListItem },
  props: {
    items: {
      default: () => [],
      type: Array,
    },
  },
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters({
      notes: 'categoryPages/notes',
    }),
  },
};

</script>
