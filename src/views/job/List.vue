<template>
  <ErrorPopup v-if="error" :message="error" />
  <div class="jobs" v-else>
    <div v-if="isLoading">
      <Spinner />
    </div>
    <ul class="jobs__list list" v-else-if="hasJobs">
      <li class="list__item" :class="job.status ? '' : 'list__item--deactivated'" v-for="job in getJobs" :key="job.id">
        <router-link class="list__link" :to="'/jobs/' + job.id + '/read'">
          <span class="list__title"> {{ job.name }} ({{ job.person }}) </span>
          <router-link class="list__button button" :to="'/jobs/' + job.id + '/read'"> Read </router-link>
          <router-link class="list__button button button--edit" :to="'/jobs/' + job.id + '/update'"> Update </router-link>
          <router-link class="list__button button button--delete" :to="'/jobs/' + job.id + '/delete'"> Delete </router-link>
        </router-link>
        <span class="list__deactivated" v-if="!job.status"> deactivated </span>
      </li>
    </ul>
    <div class="list__not-found" v-else>No jobs found</div>
    <router-link class="jobs__button button" :to="'/jobs/create'" v-if="!isLoading"> New job </router-link>
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
    this.loadJobs();
  },
  computed: {
    getJobs() {
      return this.$store.getters.jobs;
    },
    hasJobs() {
      return !this.isLoading && this.$store.getters.hasJobs;
    },
  },
  methods: {
    async loadJobs() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('loadJobs');
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.jobs {
  &__button {
    padding: 7px 10px;
    width: 100%;

    border-radius: 0 0 var(--border-radius) var(--border-radius);
  }
}
</style>
