<template>
  <div class="nav">
    <ul class="nav__list">
      <li class="nav__item" v-for="link in links" :key="link.path">
        <router-link class="nav__link" :class="{ 'router-link-active': this.$route.path.indexOf(link.path.replace('list', '')) == 0}" :to="link.path">{{ link.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
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
.nav {
  padding: 30px;

  &__list {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }

  &__item {
    @media (min-width: 768px) {
      & + & {
        &::before {
          content: '|';
          color: var(--color-text);
        }
      }
    }
  }

  &__link {
    display: inline-block;
    padding: 2px 5px;

    font-weight: bold;

    &.router-link-active {
      color: var(--color-accent);
    }
  }
}
</style>
