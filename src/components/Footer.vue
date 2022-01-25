<template>
  <div class="footer">
    <div class="container">
      <div class="footer__inner">
        <router-link class="footer__button button button--logout" :to="'/logout'">
          Logout
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style lang="scss">
.footer {
  position: fixed;
  left: calc(50% - 300px / 2);
  bottom: 0;

  width: 300px;
  padding: 10px;

  &__inner {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__button{
    font-size: 0.9rem;
  }
}
</style>
