<template>
  <ErrorPopup v-if="error" :message="error" />
  <div class="worksites" v-else>
    <div v-if="isLoading">
      <Spinner />
    </div>
    <ul class="worksites__list list" v-else-if="hasWorksites">
      <li class="list__item" :class="{'list__item--busy': this.$store.getters.hasWorksites && getActiveJob(worksite), 'list__item--deactivated': !worksite.status}" v-for="worksite in getWorksites" :key="worksite.id">
        <router-link class="list__link" :to="'/worksites/' + worksite.id + '/read'">
          <span class="list__title"> {{ worksite.name }} ({{ worksite.address }}) </span>
          <router-link class="list__button button" :to="'/worksites/' + worksite.id + '/read'"> Details </router-link>
          <router-link class="list__button button button--edit" :to="'/worksites/' + worksite.id + '/update'"> Edit </router-link>
          <a class="list__button button button--delete" v-if="worksite.status == true" @click.prevent="deleteWorksite(worksite)"> Deactivate </a>
          <a class="list__button button button--activate" v-else @click.prevent="activateWorksite(worksite)"> Activate </a>
        </router-link>
        <span class="list__deactivated" v-if="!worksite.status"> deactivated </span>
      </li>
    </ul>
    <div class="list__not-found" v-else>No worksites found</div>
    <router-link class="worksites__button button" :to="'/worksites/create'" v-if="!isLoading"> Create worksite </router-link>
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
      busy: {
        isValid: true,
      }
    };
  },
  async created() {
    this.isLoading = true;
    await this.loadWorksites();
    await this.loadJobs();
    this.isLoading = false;
  },
  computed: {
    getWorksites() {
      return this.$store.getters.worksites;
    },
    hasWorksites() {
      return !this.isLoading && this.$store.getters.hasWorksites;
    },
  },
  methods: {
    getActiveJob(worksite) {
      return this.$store.getters.jobs.find((job) => job.worksite == worksite.id && job.status);
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
    async loadJobs() {
      try {
        await this.$store.dispatch('loadJobs');
      } catch (error) {
        if (error.message != 'Cannot convert undefined or null to object') {
          this.error = error.message || 'Something went wrong!';
        }
      }
    },
    async deleteWorksite(data) {
      this.isLoading = true;

      const formData = this.$store.getters.getWorksiteById(data.id);

      if (this.$store.getters.hasJobs && this.getActiveJob(data)) {
        notify({type: 'error', title: "The worksite has active jobs" });
        this.isLoading = false;
        return;
      }

      formData.status = false;

      try {
        await this.$store.dispatch('editWorksite', formData);
        this.isLoading = false;
        this.$router.replace('/worksites/list');
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
    },
    async activateWorksite(data) {
      this.isLoading = true;

      const formData = this.$store.getters.getWorksiteById(data.id);

      formData.status = true;

      try {
        await this.$store.dispatch('editWorksite', formData);
        this.isLoading = false;
        this.$router.replace('/worksites/list');
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.worksites {
  &__button {
    padding: 7px 10px;
    width: 100%;

    border-radius: 0 0 var(--border-radius) var(--border-radius);
  }
}
</style>
