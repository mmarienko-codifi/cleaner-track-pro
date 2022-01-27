<template>
  <div class="clients">
    <ul class="clients__list list" v-if="hasClients">
      <li class="list__item" :class="client.status ? '' : 'list__item--deactivated'" v-for="client in getClients" :key="client.id">
        <router-link class="list__link" :to="'/clients/' + client.id + '/read'">
          <span class="list__title"> {{ client.name }} ({{ client.person }}) </span>
          <router-link class="list__button button" :to="'/clients/' + client.id + '/read'"> Read </router-link>
          <router-link class="list__button button button--edit" :to="'/clients/' + client.id + '/update'"> Update </router-link>
          <router-link class="list__button button button--delete" :to="'/clients/' + client.id + '/delete'"> Delete </router-link>
        </router-link>
        <span class="list__deactivated" v-if="!client.status"> deactivated </span>
      </li>
    </ul>
    <div class="list__not-found" v-else>No clients found</div>
    <router-link class="clients__button button" :to="'/clients/create'"> New client </router-link>
  </div>
</template>

<script>
export default {
  computed: {
    getClients() {
      return this.$store.getters.clients;
    },
    hasClients() {
      return this.$store.getters.hasClients;
    },
  },
};
</script>

<style lang="scss" scoped>
.clients {
  &__button {
    padding: 7px 10px;
    width: 100%;

    border-radius: 0 0 var(--border-radius) var(--border-radius);
  }
}
</style>
