<template>
  <div class="articl">
    <ul>
      <li class="title">
        <a
          :data-tooltip="linkMessage"
          :href="articl.articlUrl"
          target="_blank">
          {{ articl.title }}
        </a>

        <div
          v-if="isLoggedIn"
          class="admin articl-actions">
          <articl-actions
            :id="articl.id"
            :title="articl.title" />
        </div>
      </li>

      <li>
        <p class="authors-list">
          {{ authorsList }}
        </p>
        <details>
          <summary>
            Affiliations
          </summary>
          <ul>
            <li
              v-for="author in articl.authors"
              :key="author.nameLast"
              class="grid">
              {{ author.nameFirst }} {{ author.nameLast }}

              <ul v-if="author.affilliations.length">
                <li
                  v-for="affilliation in author.affilliations"
                  :key="affilliation">
                  {{ affilliation }}
                </li>
              </ul>
            </li>
          </ul>
        </details>
      </li>

      <li v-if="articl.journal">
        {{ articl.journal }} <span v-if="articl.year">{{ articl.year }}</span> | <a
          :data-tooltip="linkMessage"
          :href="articl.articlUrl"
          target="_blank">{{ articl.articlUrl }}</a>
      </li>

      <li v-if="articl.authorsOrig">
        <small>
          {{ highlightedSubstring(articl.authorsOrig, params.authors, "prefix")
          }}<strong
            :class="{
              'not-strong': noCaseIndexOf(articl.authorsOrig, params.authors) === -1,
            }">{{
            highlightedSubstring(articl.authorsOrig, params.authors, "term")
          }}</strong>{{ highlightedSubstring(articl.authorsOrig, params.authors, "suffix") }}
        </small>
      </li>

      <li v-if="articl.source">
        {{ articl.source }}
      </li>

      <li v-if="articl.abstract">
        <details>
          <summary>Abstract</summary>
          <div>
            {{ articl.abstract }}
          </div>
        </details>
      </li>

      <li v-if="articl.fullText">
        <details>
          <summary>FUull text</summary>
          <div>
            {{ articl.fullText }}
          </div>
        </details>
      </li>

      <li v-if="articl.thumbnailImage">
        <img
          :src="articl.thumbnailImage"
          :alt="articl.title">
      </li>

      <li v-if="articl.url">
        <img
          :src="articl.url"
          :alt="articl.title"><br>
        {{ articl.url }}
      </li>

      <li v-if="articl.imageCaption">
        {{ articl.imageCaption }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import ArticlActions from '@/components/layout/ArticlActions.vue';
import { highlightedSubstring, isNumber, noCaseIndexOf } from '@/services/stringsService';

export default {
  name: 'ArticlsListItem',
  components: {
    ArticlActions,
  },
  props: {
    articl: {
      type: Object,
      default: null,
    },
  },
  data: () => ({

  }),
  computed: {
    ...mapGetters({
      params: 'articlsParams/params',
      isLoggedIn: 'tokens/isLoggedIn',
    }),
    monthStr() {
      if (!isNumber(Number(this.articl.month))) {
        return this.articl.month;
      }

      return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][this.articl.month - 1];
    },
    linkMessage() {
      try {
        return `Read article on ${(new URL(this.articl.articlUrl)).hostname.replace('www.', '')}`;
      } catch {
        return 'Malformed url';
      }
    },
    authorsList() {
      if (this.articl?.authors?.map) {
        const list = this.articl.authors.map((author) => `${author.nameFirst} ${author.nameLast}`);
        return list.join(', ');
      }
      return [];
    },
  },
  methods: {
    highlightedSubstring,
    noCaseIndexOf,
  },

};

</script>

<style scoped lang="scss">

.articl {
  border-bottom: 1px solid $grey-100;
  margin-bottom: calc(var(--typography-spacing-vertical) * 0.5);
}

.authors-list {
  margin-bottom: calc(var(--typography-spacing-vertical) * 0.25);
}

details {
  margin-bottom: calc(vsr(--typography-spacing-vertical) * 0.25);
  border-bottom: 0;
}

summary,
details,
li:not(.title) {
  font-size: 0.875rem;
}

a {
  cursor: pointer;
}

#app > main > article > div > div > small > ul > li > a {
  margin-top: 0.5rem;
  margin-left: 0.5rem;
  color: red !important;
  cursor: pointer;
}

strong:not([class="not-strong"]) {
  padding: 0.2rem 0.1rem;
  color: black;
  background-color: #749157;
}

.grid > ul li {
  width: 100%;
  margin-bottom: 0;
}

/*
summary details .grid small::after {
  display: block;
  width: 1rem;
  height: 1rem;
  -webkit-margin-start: calc(var(--spacing, 1rem) * 0.5);
  margin-inline-start: calc(var(--spacing, 1rem) * 0.5);
  float: right;
  transform: rotate(-90deg);
  background-image: var(--icon-chevron);
  background-position: right center;
  background-size: 1rem auto;
  background-repeat: no-repeat;
  content: "";
  transition: transform var(--transition);
}
*/

/*
li {
  width:100%;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1rem;
}

li:nth-child(even){
    background-color: var(--bg1);
}
*/
/*

*/
</style>
