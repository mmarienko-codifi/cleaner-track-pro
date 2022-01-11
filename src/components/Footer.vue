<template>
  <div class="footer">
    <div class="container">
      <div class="footer__inner">
        <div class="footer__message">@CleanerTrackPro</div>
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
  padding: 30px;

  &__inner {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__message {
    font-size: 1.3em;
    font-weight: bold;
  }
}
</style>
