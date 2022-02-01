<template>
  <div class="footer">
    <div class="container">
      <div class="footer__inner">
        <!-- <router-link class="footer__button button button--logout" :to="'/logout'"> Logout </router-link> -->
        <Reports />
      </div>
    </div>
  </div>
</template>

<script>
import Reports from '@/components/Reports.vue';

export default {
  components: {
    Reports,
  },
};
</script>

<style lang="scss" scoped>
.footer {
  margin: 50px auto 0;

  &__button {
    padding: 5px 30px;
    border-radius: var(--border-radius) var(--border-radius) 0 0;
  }
}
</style>
