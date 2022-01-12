<template>
  <div class="header">
    <div class="container">
      <div class="header__inner">
        <Navigation/>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';

export default {
  name: 'Header',
  components: {
    Navigation,
  },
};
</script>
