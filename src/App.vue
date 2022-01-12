<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import AuthLayout from '@/layouts/Auth.vue';
import DefaultLayout from '@/layouts/Default.vue';
import EmptyLayout from '@/layouts/Empty.vue';

export default {
  name: 'App',
  components: {
    AuthLayout,
    DefaultLayout,
    EmptyLayout,
  },
  computed: {
    layout() {
      return (this.$route.meta.layout) + '-layout';
    },
  },
};
</script>

<style lang="scss">
@import '@/styles/reset.scss';
@import '@/styles/global.scss';
@import '@/styles/vars.scss';
</style>
