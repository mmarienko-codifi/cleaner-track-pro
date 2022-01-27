<template>
  <div class="footer">
    <div class="container">
      <div class="footer__inner">
        <router-link class="footer__button button button--logout" :to="'/logout'"> Logout </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style lang="scss" scoped>
.footer {
  margin: 0 auto;

  &__button {
    padding: 5px 30px;
    border-radius: var(--border-radius) var(--border-radius) 0 0;
  }
}
</style>
