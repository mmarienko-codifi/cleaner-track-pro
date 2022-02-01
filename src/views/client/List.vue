<template>
  <ErrorPopup v-if="error" :message="error" />
  <div class="clients" v-else>
    <div v-if="isLoading">
      <Spinner />
    </div>
    <ul class="clients__list list" v-else-if="hasClients">
      <li class="list__item" :class="client.status ? '' : 'list__item--deactivated'" v-for="client in getClients" :key="client.id">
        <router-link class="list__link" :to="'/clients/' + client.id + '/read'">
          <span class="list__title"> {{ client.name }} | {{ client.person }} | {{ client.phone }} </span>
          <router-link class="list__button button" :to="'/clients/' + client.id + '/read'"> Read </router-link>
          <router-link class="list__button button button--edit" :to="'/clients/' + client.id + '/update'"> Update </router-link>
          <a class="list__button button button--delete" @click.prevent="deleteClient(client)"> Delete </a>
        </router-link>
        <span class="list__busy" v-if="client.link"> busy </span>
        <span class="list__deactivated" v-else-if="!client.status"> deactivated </span>
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
        if (error.message != 'Cannot convert undefined or null to object') {
          this.error = error.message || 'Something went wrong!';
        }
      }
      this.isLoading = false;
    },
    async deleteClient(data) {
      this.isLoading = true;

      const formData = {
        id: data.id,
      };

      try {
        await this.$store.dispatch('deleteClient', formData);
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
      this.$router.replace('/clients/list');
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
