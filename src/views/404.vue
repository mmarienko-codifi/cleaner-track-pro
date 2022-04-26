<template>
  <div class="error">404 Error - Page Not Found</div>
</template>

<style lang="scss" scoped>
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  text-align: center;
  font-size: 2rem;

  line-height: 1.4;
  font-weight: bold;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
}
</style>
