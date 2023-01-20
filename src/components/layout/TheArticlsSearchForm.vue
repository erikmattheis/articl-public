<template>
  <form>
    <ul class="nav-tabs">
      <li :class="{ active: activeTab === 0 }">
        <a
          href
          @click.prevent="activeTab = 0"
          @keyup.enter.prevent="activeTab = 0">Search</a>
      </li>
      <li :class="{ active: activeTab === 1 }">
        <a
          href
          @click.prevent="activeTab = 1"
          @keyup.enter.prevent="activeTab = 1">More options</a>
      </li>
    </ul>
    <div
      v-show="(activeTab === 0)"
      class="active tab-content">
      <label for="title">Title <input
        id="title"
        v-model="title"
        type="text"></label>
    </div>
    <div
      v-show="activeTab === 1"
      class="active tab-content">
      <input-typeahead
        src="/articls/values/journal"
        :input-value="journal"
        label-value="Journal"
        query="journal"
        @typeahead-updated="onJournalChange" />
      <input-typeahead
        src="/articls/values/authors"
        :input-value="authors"
        label-value="Authors"
        query="authors"
        @typeahead-updated="onAuthorsChange" />
      <label for="yearComparison">Year published <label
        v-if="yearsStart === Number(year)"
        for="year"
        class="horizontal"><input
          v-model="yearComparison"
          type="radio"
          value="after"
          name="yearComparison"> After </label>
        <label
          v-for="comparison in yearComparisons"
          v-else
          :key="comparison"
          for="yearComparison"
          class="horizontal"><input
            v-model="yearComparison"
            type="radio"
            :value="comparison"
            name="yearComparison"> {{ comparison }} </label>
        <select
          v-model="year"
          autocomplete="off"
          @change="onYearChange">
          <option
            v-for="i in years"
            :key="i"> {{ i }} </option>
        </select>
        <div class="grid">
          <div>
            <fieldset>
              <legend>Type</legend>
              <label
                v-for="articlType in allTypes"
                :key="articlType"
                :for="articlType">
                <input
                  :id="articlType"
                  v-model="types"
                  type="checkbox"
                  :value="articlType"
                  checked="checked">{{ articlType }}</label>
            </fieldset>
          </div>

        </div>
      </label>
    </div>
  </form>
</template>

<script>
import { debounce } from 'lodash';
import { mapGetters } from 'vuex';

import InputTypeahead from '@/components/ui/InputTypeahead.vue';

export default {
  name: 'TheArticlsFormSearch',
  components: {
    InputTypeahead,
  },
  data() {
    return {
      activeTab: 0,
      allTypes: this.$store.state.articlsParams.allTypes,
      yearsStart: this.$store.state.articlsParams.yearsStart,
      yearComparisons: this.$store.state.articlsParams.yearComparisons,
    };
  },
  computed: {
    queryUC: (val) => val[0].toUpperCase() + val.substring(1),
    ...mapGetters({
      years: 'articlsParams/years',
      isLoggedIn: 'tokens/isLoggedIn',
    }),
    text: {
      get() {
        return this.$store.state.articlsParams.text;
      },
      set(value) {
        this.$store.dispatch('articlsParams/text', value);
      },
    },
    title: {
      get() {
        return this.$store.state.articlsParams.title;
      },
      set(value) {
        this.$store.dispatch('articlsParams/title', value);
      },
    },
    journal: {
      get() {
        return this.$store.state.articlsParams.journal;
      },
      set(value) {
        this.$store.dispatch('articlsParams/journal', value);
      },
    },
    authors: {
      get() {
        return this.$store.state.articlsParams.authors;
      },
      set(value) {
        this.$store.dispatch('articlsParams/authors', value);
      },
    },
    yearComparison: {
      get() {
        return this.$store.state.articlsParams.yearComparison;
      },
      set(value) {
        this.$store.dispatch('articlsParams/yearComparison', value);
      },
    },
    year: {
      get() {
        return this.$store.state.articlsParams.year;
      },
      set(value) {
        if (Number(value) === Number(this.yearsStart)) {
          this.$store.dispatch('articlsParams/yearComparison', 'after');
        }

        this.$store.dispatch('articlsParams/year', value);
      },
    },
    types: {
      get() {
        return this.$store.state.articlsParams.types;
      },
      set(value) {
        this.$store.dispatch('articlsParams/types', value);
      },
    },
  },
  watch: {
    yearComparison: {
      handler(newValue) {
        this.$store.dispatch('articlsParams/yearComparison', newValue);
      },
    },
  },
  created() {
    this.$store.dispatch(
      'articlsParams/types',
      this.$store.state.articlsParams.allTypes,
    );

    this.onTitleChange = debounce(this.onTitleChange, 200);
  },
  unmounted() {
    this.$store.dispatch('articlsParams/text', undefined);

    this.$store.dispatch('articlsParams/title', undefined);

    this.$store.dispatch('articlsParams/journal', undefined);

    this.$store.dispatch('articlsParams/authors', undefined);

    this.$store.dispatch('articlsParams/yearComparison', undefined);

    this.$store.dispatch('articlsParams/types', []);
  },
  methods: {
    onTypesChange(event) {
      this.$store.dispatch('articlsParams/types', event.target.value);
    },
    onYearChange(event) {
      this.$store.dispatch('articlsParams/year', event.target.value);
    },
    onJournalChange(event) {
      this.$store.dispatch('articlsParams/journal', event.value);
    },
    onAuthorsChange(event) {
      this.$store.dispatch('articlsParams/authors', event.value);
    },
    onTitleChange(event) {
      this.$store.dispatch('articlsParams/title', event.target.value);
    },
    onYearComparisonChange(event) {
      this.$store.dispatch('articlsParams/yearComparison', event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
select {
  overflow: scroll;
}

.horizontal {
  display: inline-block;
  margin-right: 0.5rem;
}

/*
* Nav tabs
*/

.grid>li {
  display: inline-block;
  margin-top: 0;
  margin-bottom: 0;
}

/*
* End nav tabs
*/
</style>
