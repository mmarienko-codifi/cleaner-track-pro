<template>
  <div class="home">
    <ul class="home__list">
      <li class="home__item">
        <router-link class="home__link" to="clients">Clients</router-link>
      </li>
      <li class="home__item">
        <router-link class="home__link" to="worksites">Worksites</router-link>
      </li>
      <li class="home__item">
        <router-link class="home__link" to="employees">Employees</router-link>
      </li>
      <li class="home__item">
        <router-link class="home__link" to="equipments">Equipments</router-link>
      </li>
      <li class="home__item">
        <router-link class="home__link" to="jobs">Jobs</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>
