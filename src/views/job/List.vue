<template>
  <ErrorPopup v-if="error" :message="error" />
  <div class="jobs" v-else>
    <div v-if="isLoading">
      <Spinner />
    </div>
    <ul class="jobs__list list" v-else-if="hasJobs && hasEmployees && hasWorksites">
      <li class="list__item" v-for="job in getJobs" :class="{'list__item--deactivated': !job.status}" :key="job.id">
        <router-link class="list__link" :to="'/jobs/' + job.id + '/read'">
          <span class="list__title"> {{ this.$store.getters.getWorksiteById(job.worksite).name }} ({{ this.$store.getters.getEmployeeById(job.employee).name }} | {{ job.service }}$) </span>
          <router-link class="list__button button" :to="'/jobs/' + job.id + '/read'"> Details </router-link>
          <router-link class="list__button button button--edit" :to="'/jobs/' + job.id + '/update'"> Edit </router-link>
          <a class="list__button button button--delete" v-if="job.status == true" @click.prevent="deleteJob(job)"> Deactivate </a>
          <a class="list__button button button--activate" v-else @click.prevent="activateJob(job)"> Activate </a>
        </router-link>
        <span class="list__deactivated" v-if="!job.status"> deactivated </span>
      </li>
    </ul>
    <div class="list__not-found" v-else>No jobs found</div>
    <router-link class="jobs__button button" :to="'/jobs/create'" v-if="!isLoading"> Create job </router-link>
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
    await this.loadEmployees();
    await this.loadEquipments();
    await this.loadJobs();
    this.isLoading = false;
  },
  computed: {
    getWorksites() {
      return this.$store.getters.worksites.filter((worksite) => worksite.status && !worksite.client);
    },
    getEmployees() {
      return this.$store.getters.employees.filter((employee) => employee.status);
    },
    getEquipments() {
      return this.$store.getters.equipments.filter((equipment) => equipment.status);
    },
    getJobs() {
      return this.$store.getters.jobs;
    },
    hasJobs() {
      return !this.isLoading && this.$store.getters.hasJobs;
    },
    hasEmployees() {
      return !this.isLoading && this.$store.getters.hasEmployees;
    },
    hasWorksites() {
      return !this.isLoading && this.$store.getters.hasWorksites;
    },
  },
  methods: {
    async loadWorksites() {
      try {
        await this.$store.dispatch('loadWorksites');
      } catch (error) {
        if (error.message != 'Cannot convert undefined or null to object') {
          if (error.message != 'Cannot convert undefined or null to object') {
          this.error = error.message || 'Something went wrong!';
        }
        }
      }
    },
    async loadEmployees() {
      try {
        await this.$store.dispatch('loadEmployees');
      } catch (error) {
        if (error.message != 'Cannot convert undefined or null to object') {
          if (error.message != 'Cannot convert undefined or null to object') {
          this.error = error.message || 'Something went wrong!';
        }
        }
      }
    },
    async loadEquipments() {
      try {
        await this.$store.dispatch('loadEquipments');
      } catch (error) {
        if (error.message != 'Cannot convert undefined or null to object') {
          if (error.message != 'Cannot convert undefined or null to object') {
          this.error = error.message || 'Something went wrong!';
        }
        }
      }
    },
    async loadJobs() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('loadJobs');
      } catch (error) {
        if (error.message != 'Cannot convert undefined or null to object') {
          if (error.message != 'Cannot convert undefined or null to object') {
          this.error = error.message || 'Something went wrong!';
        }
        }
      }
      this.isLoading = false;
    },
    async deleteJob(data) {
      this.isLoading = true;

      const formData = this.$store.getters.getJobById(data.id);

      formData.status = false;

      const selectedWorksite = this.$store.getters.worksites.find((worksite) => worksite.id == data.worksite);
      selectedWorksite.link = null;

      try {
        await this.$store.dispatch('editJob', formData);
      } catch (error) {
        if (error.message != 'Cannot convert undefined or null to object') {
          this.error = error.message || 'Something went wrong!';
        }
      }

      try {
        await this.$store.dispatch('editWorksite', selectedWorksite);
      } catch (error) {
        if (error.message != "Cannot read properties of undefined (reading 'push')") {
          this.error = error.message || 'Something went wrong!';
        }
      }

      this.isLoading = false;
      this.$router.replace('/jobs/list');
    },
    async activateJob(data) {
      this.isLoading = true;

      const formData = this.$store.getters.getJobById(data.id);
      const selectedWorksite = this.$store.getters.worksites.find((worksite) => worksite.id == data.worksite);

      if (!selectedWorksite.link) {
        selectedWorksite.link = formData.id;
        formData.status = true;
      } else {
        notify({type: 'error', title: "The job has busy worksite. You cannot activate it." });
        this.isLoading = false;
        return;
      }

      try {
        await this.$store.dispatch('editJob', formData);
      } catch (error) {
        if (error.message != 'Cannot convert undefined or null to object') {
          this.error = error.message || 'Something went wrong!';
        }
      }

      try {
        await this.$store.dispatch('editWorksite', selectedWorksite);
      } catch (error) {
        if (error.message != "Cannot read properties of undefined (reading 'push')") {
          this.error = error.message || 'Something went wrong!';
        }
      }

      this.isLoading = false;
      this.$router.replace('/jobs/list');
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
