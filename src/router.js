import { createRouter, createWebHistory } from 'vue-router';
import createArticlPage from '@/pages/articls/create.vue';
import deleteArticlPage from '@/pages/articls/delete.vue';
import searchArticls from '@/pages/articls/index.vue';
import deleteCategoryPage from '@/pages/categories/delete.vue';
import createCategoryPage from '@/pages/categories/index.vue';
import categoryPage from '@/pages/resource/index.vue';
import forgotPassPage from '@/pages/forgot-pass.vue';
import homePage from '@/pages/index.vue';
import loginPage from '@/pages/login.vue';
import deleteNote from '@/pages/notes/delete.vue';
import notFound from '@/pages/NotFound.vue';

import resetPasswordPage from '@/pages/change-password.vue';
import usersPage from '@/pages/users/index.vue';
import verifyEmailPage from '@/pages/verify-email.vue';
import TabCategories from '@/components/layout/TabCategories.vue';
import TabNotes from '@/components/layout/TabNotes.vue';
import TabArticls from '@/components/layout/TabArticls.vue';
import TabBlogs from '@/components/layout/TabBlogs.vue';
import TabQuestionsAnswers from '@/components/layout/TabQuestionsAnswers.vue';

const router = createRouter({
  history: createWebHistory(),

  routes: [

    {
      name: 'homePage',
      path: '/',
      component: homePage,
    },

    {
      name: 'searchArticls',
      path: '/articls',
      component: searchArticls,
    },

    {
      name: 'categoryPage',
      path: '/resource/:slug',
      component: categoryPage,
      children: [{
        name: 'TabCategories',
        path: '',
        component: TabCategories,
      },
      {
        name: 'TabNotes',
        path: 'notes',
        component: TabNotes,
        props: true,
      },
      {
        name: 'TabBlogs',
        path: 'blogs',
        component: TabBlogs,
      },
      {
        name: 'TabQuestionsAnswers',
        path: 'qa',
        component: TabQuestionsAnswers,
      },
      {
        name: 'TabArticls',
        path: 'articls/:type?',
        component: TabArticls,
      }],

    },

    {
      name: 'verifyEmailPage',
      path: '/verify-email',
      component: verifyEmailPage,
    },

    {
      name: 'loginPage',
      path: '/login',
      component: loginPage,
    },

    {
      name: 'sendVerificationEmail',
      path: '/send-verification-email',
      component: resetPasswordPage,
    },

    {
      name: 'forgotPassPage',
      path: '/forgot-pass',
      component: forgotPassPage,
    },

    {
      name: 'resetPasswordPage',
      path: '/change-password',
      component: resetPasswordPage,
    },

    {
      name: 'usersPage',
      path: '/users/:id',
      component: usersPage,
    },

    {
      name: 'users',
      path: '/users',
      component: usersPage,
    },

    {
      name: 'createCategoryPage',
      path: '/categories/:slug?',
      component: createCategoryPage,
    },

    {
      name: 'editCategory',
      path: '/categories/edit/:id?',
      component: createCategoryPage,
    },

    {
      name: 'deleteCategory',
      path: '/categories/delete/:slug?',
      component: deleteCategoryPage,
    },

    {
      name: 'editArticl',
      path: '/articls/create/:id',
      component: createArticlPage,
    },

    {
      name: 'createArticlPage',
      path: '/articls/create',
      component: createArticlPage,
    },

    {
      name: 'deleteArticl',
      path: '/articls/delete/:id/:title',
      component: deleteArticlPage,
    },

    {
      name: 'deleteNote',
      path: '/notes/delete',
      component: deleteNote,
    },

    {
      name: 'NotFound', path: '/:notFound(.*)', component: notFound,
    },
  ],
});

/*
    {
      name: "importCategoriesPage",
      path: "/categories/:slug?",
      component: importCategoriesPage,
    },
*/

export default router;
