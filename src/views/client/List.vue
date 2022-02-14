<template>
  <ErrorPopup v-if="error" :message="error" />
  <div class="clients" v-else>
    <div v-if="isLoading">
      <Spinner />
    </div>
    <ul class="clients__list list" v-else-if="hasClients">
      <li class="list__item" :class="{'list__item--busy': this.$store.getters.hasWorksites && getActiveWorksites(client).length > 0, 'list__item--deactivated': !client.status}" v-for="client in getClients" :key="client.id">
        <router-link class="list__link" :to="'/clients/' + client.id + '/read'">
          <span class="list__title"> {{ client.name }} ({{ client.person }}) {{ client.phone }}</span>
          <router-link class="list__button button" :to="'/clients/' + client.id + '/read'"> Details </router-link>
          <router-link class="list__button button button--edit" :to="'/clients/' + client.id + '/update'"> Edit </router-link>
          <a class="list__button button button--delete" v-if="client.status == true" @click.prevent="deleteClient(client)"> Deactivate </a>
          <a class="list__button button button--activate" v-else @click.prevent="activateClient(client)"> Activate </a>
        </router-link>
        <span class="list__busy" v-if="this.$store.getters.hasWorksites && getActiveWorksites(client).length == 1"> one worksite is busy </span>
        <span class="list__busy" v-else-if="this.$store.getters.hasWorksites &&getActiveWorksites(client).length > 1"> some worksites are busy </span>
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
import { notify } from "@kyvg/vue3-notification";

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
  async created() {
    this.isLoading = true;
    await this.loadWorksites();
    await this.loadClients();
    this.isLoading = false;
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
    getActiveWorksites(client) {
      return this.$store.getters.worksites.filter((worksite) => worksite.client == client.id && worksite.link);
    },
    async loadWorksites() {
      
      try {
        await this.$store.dispatch('loadWorksites');
      } catch (error) {
        if (error.message != 'Cannot convert undefined or null to object') {
          this.error = error.message || 'Something went wrong!';
        }
      }

    },
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

      if (this.$store.getters.hasWorksites && this.getActiveWorksites(data).length > 0) {
        notify({type: 'error', title: "The client has busy worksites. You cannot deactivate it." });
        this.isLoading = false;
        return;
      }

      const formData = this.$store.getters.getClientById(data.id);
      
      formData.status = false;

      try {
        await this.$store.dispatch('editClient', formData);
      } catch (error) {
        if (error.message != 'Cannot convert undefined or null to object') {
          this.error = error.message || 'Something went wrong!';
        }
      }
      this.isLoading = false;
      this.$router.replace('/clients/list');
    },
    async activateClient(data) {
      this.isLoading = true;

      const formData = this.$store.getters.getClientById(data.id);
      
      formData.status = true;

      try {
        await this.$store.dispatch('editClient', formData);
      } catch (error) {
        if (error.message != 'Cannot convert undefined or null to object') {
          this.error = error.message || 'Something went wrong!';
        }
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
