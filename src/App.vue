<template>
  <div class="vertical-container">
    <the-header />
    <main>
      <router-view v-slot="{ Component }">
        <transition
          name="fade"
          mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <the-footer />
  </div>
  <modal-error />
  <modal-success />
</template>

<script>
/* VUE
 * 1939,1200, 1,244, 1983, 1883 .js
 *  538, 3250, 3,623, 3,910, 5,475 .vue
 *

 *
 * NODE
 * 2706,2,487, 2,553, 3842 .js
 *
 * 4/15, 5/20, 6/1, 6/6
 * 5183,6937,7420
 * ==================
 *
 * proj, 4/15, 6/8
 * vue, 2556, 5223
 * node, 2094, 2593
 * total, 4650, 7816
 *** */

import TheFooter from '@/components/layout/TheFooter.vue';
import TheHeader from '@/components/layout/TheHeader.vue';
import ModalError from '@/components/ui/ModalError.vue';
import ModalSuccess from '@/components/ui/ModalSuccess.vue';

export default {
  name: 'App',
  components: {
    TheHeader,
    TheFooter,
    ModalError,
    ModalSuccess,
  },
  data: () => ({
    start: 0,
  }),
  mounted() {
    this.$store.dispatch('tokens/accessTokenValue', this.$cookies.get('accessTokenValue'));

    this.$store.dispatch('tokens/accessTokenExpires', this.$cookies.get('accessTokenExpires'));

    this.$store.dispatch('tokens/refreshTokenValue', this.$cookies.get('refreshTokenValue'));

    this.$store.dispatch('tokens/refreshTokenExpires', this.$cookies.get('refreshTokenExpires'));
  },
  created() {
    this.start = performance.now();
  },
  methods: {

  },
};

</script>

<style lang="scss">
@import "./assets/variables";
@import "~/node_modules/@picocss/pico/scss/pico.scss";
@import "./assets/maxwidth.scss";
@import "./assets/styles-override.scss";

@import "//fonts.googleapis.com/css2?family=Open+Sans&display=swap";

.row-admin-container {
  display: grid;
  grid-template-columns: 1fr min-content;
}

.row-admin-box {
  display: grid;
  grid-template-columns: min-content min-content min-content;
  grid-gap: 5px;
  padding: 0 5px;
}

.row-admin-box > a {
  border: 0 !important;
  padding: 0 5px !important;
}

.fade-enter-active {
  transition: opacity .1s ease;
  transition-delay: .1s;
}

.fade-leave-active {
  transition: opacity .1s ease;
}

.fade-leave-to,
.fade-enter-from {
  opacity: 0;
}

.ghost {
  border: 2px dashed red !important;
}

.handle {
  padding: 0 !important;
}

.left-space {
  padding-left: 2rem;
}

.line-detail {
  background-color: var(--bg1);
  padding: 0 0.5rem;
}

.line-main {
  padding: 0 0.5rem;
}

.nav-tabs-margin {
  margin: var(--nav-element-spacing-vertical) var(--nav-element-spacing-vertical);
}

.nav-tabs-inner-margin {
  margin: 0 var(--nav-element-spacing-vertical);
}

.nav-tabs li.active,
.active {
  border: 1px solid $grey-100;
  border-bottom: 1px solid var(--background-color);
}

.nav-tabs {
  margin-bottom: 0;
  column-gap: 0;
  position: relative;
  z-index: 10;
}

.nav-tabs li,
.note-actions li,
.articl-actions li {
  border-width: 1px;
  border-right-width: 0;
  border-style: solid;
  border-color: $grey-100;
  border: 1px solid transparent;
  display: inline-block;
  padding: var(--nav-element-spacing-horizontal);
  vertical-align: middle;
  margin-bottom: 0;
  column-gap: 0;
}

.nav-tabs li:last-child,
.note-actions li:last-child,
.articl-actions li:last-child {
  border-right-width: 1px;
}

.articl-actions a,
.note-actions a,
.nav-tabs li a {
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 0 1rem;
  text-decoration: none;
  background-color: transparent;
}

.nav-content {
  position:relative;
  top: -1px;
  z-index:0;
  border: 1px solid $grey-100;
  padding: var(--spacing)
}

.right {
  float: right;
}

.sr {
  display: inline-block;
  line-height: .5rem;
  text-indent: -10000px;
}

.tab-content {
  width: 100%;
}

.toggle-password {
  position: relative;
}

.toggle-password-mask {
  cursor: pointer;
  vertical-align: middle;
  //padding: calc(var(--form-element-spacing-horizontal) * 0.5);
  height: 2.2rem;
  position: absolute;
  top: calc(var(--form-element-spacing-vertical) * 0.5);
  right: 1rem;
  width: 2.2rem;
  top:50%;
  transform:translateY(-50%);
}

.vertical-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
}

.vertical-container main {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.vertical-container main article {
  flex-grow: 1;
}

:where(:root),
html,
body {
  align-items: center;
  border-radius: 0;
  display: flex;
  justify-content: center;
}

:root footer article {
  margin-bottom: 0;
  margin-top: 0;
}

:root header article {
  margin-bottom: 0;
  margin-top: 0;
  padding-bottom: 0;
  padding-top: 0;
}

input:not([type="checkbox"], [type="radio"], [type="range"]) {
  height: initial;
}

input:not([type="checkbox"], [type="radio"], [type="range"], [type="file"]),
select,
textarea {
  padding: calc(var(--form-element-spacing-vertical) * 0.5) calc(var(--form-element-spacing-horizontal) * 0.5);
}

input[role="switch"],
input[type="radio"] {
  border-radius: 1rem !important;
}

:root main article {
  margin-bottom: 0;
  margin-top: 0;
  padding-top: 0;
}

article h2,
main form {
  margin-bottom: var(--block-spacing-vertical);
}

small {
  font-size: 0.7rem;
}

ul {
  list-style-type: none !important;
  padding-left: 0;
}

ul li {
  list-style-type: none !important;
}

@media prefers-reduced-motion {
  .fade-leave-to,
  .fade-enter-from {
    opacity: 1;
  }
}
</style>
