<template>
  <div class="clients">
    <ul class="clients__list list" v-if="hasClients">
      <li class="list__item"  :class="client.status ? '' : 'list__item--deactivated'" v-for="client in getClients" :key="client.id">
        <router-link class="list__title" :to="'/clients/' + client.id + '/read'">
          {{ client.name }} ({{ client.person }}) 
        </router-link>
        <span class="list__deactivated"  v-if="!client.status">
            deactivated
        </span>
        <router-link
          class="list__button button"
          :to="'/clients/' + client.id + '/read'"
        >
          Read
        </router-link>
        <router-link
          class="list__button button button--edit"
          :to="'/clients/' + client.id + '/update'"
        >
          Update
        </router-link>
        <router-link
          class="list__button button button--delete"
          :to="'/clients/' + client.id + '/delete'"
        >
          Delete
        </router-link>
      </li>
    </ul>
    <span class="clients__span" v-else>No clients found</span>
    <router-link class="clients__button button" :to="'/clients/create'">
      New client
    </router-link>
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
    }
  },
};
</script>

<style lang="scss" scoped>
.clients {
  &__button {
    display: inline-block;
    padding: 10px 20px;
    margin: 10px 0;
    width: 100%;

    text-align: center;
  }
}
</style>
