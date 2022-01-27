<template>
  <div class="home">
    <ul class="home__list">
      <li class="home__item" v-for="link in links" :key="link.path">
        <router-link class="home__link" :to="link.path">{{ link.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { title: 'Clients', path: '/clients/list' },
        { title: 'Worksites', path: '/worksites/list' },
        { title: 'Employees', path: '/employees/list' },
        { title: 'Equipments', path: '/equipments/list' },
        { title: 'Jobs', path: '/jobs/list' },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  &__list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__link {
    display: inline-block;
    padding: 10px 5px;

    font-size: 1.5rem;
    font-weight: bold;

    transition: color 0.1s ease;

    &:hover {
      color: var(--color-accent);
    }
  }
}
</style>
