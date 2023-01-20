<template>
  <div>
    <ul class="nav-tabs nav-tabs-inner-margin">
      <li
        v-for="articlType in articlTypes"
        :key="articlType"
        :class="{ active: articlTypeCurrent === articlType }">
        <a
          href
          @click.prevent="articlTypeCurrent = articlType"
          @keyup.enter.prevent="articlTypeCurrent = articlType">
          {{ articlType }}</a>
      </li>
    </ul>

    <ul
      v-if="articlTypeCurrent"
      class="nav-content">
      <draggable-items
        v-model="articls[articlTypeCurrent]"
        tag="ul"
        item-key="id"
        handle=".handle"
        ghost-class="ghost"
        @change="onUpdateArticlsOrderValues">
        <template #item="{ element }">
          <articls-list-item
            :articl="element"
            :order="element.order" />
        </template>
      </draggable-items>
    </ul>No entries yet.
    <div v-if="(articls[articlTypeCurrent]?.length === 0)">
      No entries yet.
    </div>
  </div>
</template>

<script>
import DraggableItems from 'vuedraggable';
import { mapGetters } from 'vuex';

import ArticlsListItem from '@/components/layout/ArticlsListItem.vue';

export default {
  name: 'TabArticls',
  components: {
    DraggableItems,
    ArticlsListItem,
  },
  props: {
    items: {
      default: () => [],
      type: Array,
    },
    type: {
      default: () => '',
      type: String,
    },
    slug: {
      default: () => '',
      type: String,
    },
  },
  data() {
    return {
      articlTypeCurrent: undefined,
    };
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'tokens/isLoggedIn',
      articls: 'categoryPages/articls',
      articlTypes: 'categoryPages/articlTypes',
    }),
  },
  mounted() {
    [this.articlTypeCurrent] = this.articlTypes;
  },
  methods: {

    updateArticlsOrderValues(articlType) {
      try {
        this.articls[articlType].forEach((obj, index) => {
          const objRef = obj;

          objRef.order = index;
        });
      } catch (error) {
        this.$store.dispatch('errors/setError', error);
      }
    },

    async saveArticlsOrderValues(articlType) {
      try {
        const order = this.articls[articlType].map((obj) => ({
          id: obj.id,
          order: obj.order,
        }));

        await this.saveArticlsOrder(order);
      } catch (error) {
        this.$store.dispatch('errors/setError', error);
      }
    },

    async saveArticlsOrder(order) {
      this.isLoading = true;

      const result = await this.$http({
        method: 'POST',
        url: '/articls/order',
        data: {
          order,
        },
      });

      this.isLoading = false;

      return result.data;
    },

    onUpdateArticlsOrderValues() {
      this.updateArticlsOrderValues(this.articlTypeCurrent);

      this.saveArticlsOrderValues(this.articlTypeCurrent);
    },
  },
};

</script>
