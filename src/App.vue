<template>
  <component :is="layout">
    <router-view />
  </component>
  <notifications classes="notifications notification-app" position="bottom right"/>
</template>

<script>
import HomeLayout from '@/layouts/Home.vue';
import DefaultLayout from '@/layouts/Default.vue';
import EmptyLayout from '@/layouts/Empty.vue';

export default {
  name: 'App',
  components: {
    HomeLayout,
    DefaultLayout,
    EmptyLayout,
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || 'default') + '-layout';
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/reset.scss';
@import '@/assets/styles/global.scss';
@import '@/assets/styles/vars.scss';
</style>
