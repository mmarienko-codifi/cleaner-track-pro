<template>
  <div class="employees">
    <router-link class="employees__button button" :to="'/employees/new'">
      New employee
    </router-link>
  </div>
</template>

<script>

</script>

<style lang="scss" scoped>
.employees {
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