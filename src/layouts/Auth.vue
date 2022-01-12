<template>
  <div class="wrapper">
    <div class="main">
      <router-view />
    </div>
    <Footer/>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue';

export default {
  name: 'AuthLayout',
  components: {
    Footer,
  },
};
</script>