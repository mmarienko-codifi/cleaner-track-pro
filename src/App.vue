<template>
  <Navigation v-if="$route.name !== 'Home'" />
  <router-view />
</template>

<script>
import Navigation from './components/Navigation.vue';

export default {
  name: 'App',
  components: {
    Navigation,
  },
};
</script>
