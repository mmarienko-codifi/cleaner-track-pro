<template>
  <div class="home">
    <ul class="home__list">
      <li class="home__item" v-for="link in links" :key="link.path">
        <router-link class="home__link" :to="link.path">{{
          link.title
        }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      links: [
        { title: 'Clients', path: '/clients' },
        { title: 'Worksites', path: '/worksites' },
        { title: 'Employees', path: '/employees' },
        { title: 'Equipments', path: '/equipments' },
        { title: 'Jobs', path: '/jobs' },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  position: absolute;
  top: 50%;
  left: 50%;

  padding: 20px;

  transform: translate(-50%, -50%);
    
  &__list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  &__link {
    display: inline-block;
    padding: 10px 5px;

    font-size: 1.5rem;
    font-weight: bold;

    transition: color .1s ease;

    &:hover{
      color: var(--color-accent);
    }
  }
}
</style>
