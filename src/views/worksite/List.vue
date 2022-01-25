<template>
  <div class="worksites">
    <router-link class="worksites__button button" :to="'/worksites/new'">
      New worksite
    </router-link>
  </div>
</template>

<script>

</script>

<style lang="scss" scoped>
.worksites {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 500px;

  padding: 30px;
  min-width: 250px;

  background: var(--color-form);
  border-radius: 10px;

  &__button {
    margin-top: 30px; 
  }
}
</style>