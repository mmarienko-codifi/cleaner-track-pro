<template>
  <Header/>
  <div class="main">
    <router-view />
  </div>
  <Footer/>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="scss">
@import '@/styles/reset.scss';
@import '@/styles/global.scss';
@import '@/styles/vars.scss';
</style>
