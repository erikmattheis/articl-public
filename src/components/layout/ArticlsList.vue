<template>
  <ul>
    <draggable-items
      v-if="!isLoading"
      v-model="articls"
      tag="ul"
      item-key="id"
      handle=".handle"
      ghost-class="ghost"
      @change="onUpdateOrderValues">
      <template #item="{ element }">
        <li>
          <articls-list-item
            :articl="element"
            order="0" />
        </li>
      </template>
    </draggable-items>
    <li
      v-if="(articls.length === 0)">
      No entries yet.
    </li>
  </ul>
  articls: {{ articls }}
  <transition
    name="fade"
    mode="out-in">
    <loading-placeholder v-if="isLoading" />
  </transition>
</template>

<script>
import { isEqual } from 'lodash';
import DraggableItems from 'vuedraggable';
import { mapGetters } from 'vuex';

import ArticlsListItem from '@/components/layout/ArticlsListItem.vue';
import LoadingPlaceholder from '@/components/ui/LoadingPlaceholder.vue';

export default {
  name: 'ArticlsList',
  components: {
    DraggableItems,
    LoadingPlaceholder,
    ArticlsListItem,
  },
  data: () => ({
    articls: [],
    isLoading: false,
  }),
  computed: {
    ...mapGetters({
      params: 'articlsParams/params',
    }),
  },
  watch: {
    params: {
      handler(newValue) {
        this.updateValues(newValue);
      },
      deep: true,
    },
  },
  methods: {
    updateOrderValues() {
      try {
        this.articls.forEach((obj, index) => {
          const objValue = obj;

          objValue.order = index;
        });
      } catch (error) {
        this.$store.dispatch('errors/setError', error);
      }
    },
    async saveOrderValues() {
      try {
        const order = this.articls.map((obj) => ({
          id: obj.id,
          order: obj.order,
        }));

        await this.saveOrder(order);
      } catch (error) {
        this.$store.dispatch('errors/setError', error);
      }
    },
    onUpdateOrderValues() {
      this.updateOrderValues();

      this.saveOrderValues();
    },
    async updateValues(params) {
      try {
        if (isEqual(params, {
        })) {
          this.articls = [];

          this.totalResults = '--';

          return;
        }

        if (params) {
          this.isLoading = true;

          const result = await this.getArticls(params);

          this.isLoading = false;

          if (Number(result.page) === 1 || result.results?.length === 0) {
            this.articls = [];

            this.totalResults = '--';
          }

          this.articls = this.articls.concat(result.results);

          this.totalPages = result.totalPages;

          this.limit = result.limit;

          this.totalResults = result.totalResults;
        }
      } catch (error) {
        this.$store.dispatch('errors/setError', error);
      }
    },
    async saveOrder(order) {
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
    async getArticls(params) {
      this.isLoading = true;

      const result = await this.$http({
        method: 'GET',
        url: '/articls',
        params,
      });

      this.isLoading = false;

      return result.data;
    },
  },
};
</script>
