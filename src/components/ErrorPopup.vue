<template>
  <div class="modal">
    <div class="modal__area"></div>
    <div class="modal__body">
      <div class="modal__content">
        <div class="modal__text">Error: {{ this.message }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['message'],
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(#000, 0.7);
  overflow-y: auto;
  overflow-x: hidden;

  z-index: 100;

  &__area {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    z-index: -1;
  }

  &__body {
    width: 100%;
    min-height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    padding: 40px 20px;
  }

  &__content {
    width: 100%;
    max-width: 500px;

    margin: 0 auto;
    padding: 20px 15px;

    background: var(--color-main);
    border: 10px solid var(--color-delete);
    border-radius: var(--border-radius);
  }
}
</style>
