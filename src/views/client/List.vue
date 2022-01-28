<template>
  <ErrorPopup v-if="error" :message="error" />
  <div class="clients" v-else>
    <div v-if="isLoading">
      <Spinner />
    </div>
    <ul class="clients__list list" v-else-if="hasClients">
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
    <router-link class="clients__button button" :to="'/clients/create'" v-if="!isLoading"> New client </router-link>
  </div>
</template>

<script>
import Spinner from '@/components/Spinner.vue';
import ErrorPopup from '@/components/ErrorPopup.vue';

export default {
  components: {
    Spinner,
    ErrorPopup,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  created() {
    this.loadClients();
  },
  computed: {
    getClients() {
      return this.$store.getters.clients;
    },
    hasClients() {
      return !this.isLoading && this.$store.getters.hasClients;
    },
  },
  methods: {
    async loadClients() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('loadClients');
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
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
