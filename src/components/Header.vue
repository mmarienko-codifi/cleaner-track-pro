<template>
  <div class="header">
    <div class="container">
      <div class="header__inner">
        <Navigation v-if="$route.name !== 'Home'" />
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
