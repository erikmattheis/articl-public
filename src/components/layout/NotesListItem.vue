<template>
  <template v-if="!isEditing">
    <ul>
      <li class="line-detail">
        <template v-if="note.author?.nameFirst || note.author?.nameLast">
          {{ note.author.nameFirst }} {{ note.author.nameLast }}
        </template>
        <template v-else>
          Anonymous
        </template>
        <span class="right"> created at: {{ note.createdAt }}</span>
      </li>
      <li
        class="main-line">
        <span :aria-busy="isLoading" /> <span v-if="!isLoading">{{ note.fullText }}</span>
      </li>
    </ul>
    <div v-if="isLoggedIn">
      <admin-actions-note
        :id="note.id"
        :full-text="note.fullText"
        :slug="note.slug"
        @edit-mode="isEditing = true" />
    </div>
  </template>

  <note-crud
    v-else
    :slug="note.slug"
    :passed-id="note.id"
    @view-mode="getCurrentNote" />
</template>

<script>
import { mapGetters } from 'vuex';

import AdminActionsNote from '@/components/layout/AdminActionsNote.vue';
import NoteCrud from '@/components/layout/NoteCrud.vue';

export default {
  name: 'NoteListItem',
  components: {
    AdminActionsNote,
    NoteCrud,
  },
  props: {
    passedNote: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    isEditing: false,
    isLoading: false,
  }),

  computed: {
    ...mapGetters({
      isLoggedIn: 'tokens/isLoggedIn',
    }),
  },

  created() {
    this.note = this.passedNote;
  },
  methods: {
    async getCurrentNote(id) {
      try {
        this.isLoading = true;

        this.isEditing = false;

        const result = await this.getNote(id);

        this.note = result.data;

        this.isLoading = false;
      } catch (error) {
        this.$store.dispatch('errors/setError', error);
      }
    },
    async getNote(id) {
      return this.$http({
        method: 'GET',
        url: `/notes/${id}`,
      });
    },
  },
};
</script>
