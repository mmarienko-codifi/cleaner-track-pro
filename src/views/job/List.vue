<template>
  <ErrorPopup v-if="error" :message="error" />
  <div class="jobs" v-else>
    <div v-if="isLoading">
      <Spinner />
    </div>
    <ul class="jobs__list list" v-else-if="hasJobs">
      <li class="list__item" v-for="job in getJobs" :key="job.id">
        <router-link class="list__link" :to="'/jobs/' + job.id + '/read'">
          <span class="list__title"> {{ job.worksite }} | {{ job.employee }} | {{ job.service }}$ </span>
          <router-link class="list__button button" :to="'/jobs/' + job.id + '/read'"> Read </router-link>
          <router-link class="list__button button button--edit" :to="'/jobs/' + job.id + '/update'"> Update </router-link>
          <a class="list__button button button--delete" @click.prevent="deleteJob(job)"> Delete </a>
        </router-link>
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
  async created() {
    this.isLoading = true;
    await this.loadJobs();
    await this.loadWorksites();
    await this.loadEmployees();
    await this.loadEquipments();
    this.isLoading = false;
  },
  computed: {
    getWorksites() {
      return this.$store.getters.worksites.filter((worksite) => worksite.status && !worksite.link);
    },
    getEmployees() {
      return this.$store.getters.employees.filter((employee) => employee.status && !employee.link);
    },
    getEquipments() {
      return this.$store.getters.equipments.filter((equipment) => equipment.status && !equipment.link);
    },
    getJobs() {
      return this.$store.getters.jobs;
    },
    hasJobs() {
      return !this.isLoading && this.$store.getters.hasJobs;
    },
  },
  methods: {
    async loadWorksites() {
      try {
        await this.$store.dispatch('loadWorksites');
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
    },
    async loadEmployees() {
      try {
        await this.$store.dispatch('loadEmployees');
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
    },
    async loadEquipments() {
      try {
        await this.$store.dispatch('loadEquipments');
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
    },
    async loadJobs() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('loadJobs');
      } catch (error) {
        if (error.message != 'Cannot convert undefined or null to object') {
          this.error = error.message || 'Something went wrong!';
        }
      }
      this.isLoading = false;
    },
    async deleteJob(data) {
      this.isLoading = true;

      this.job = this.$store.getters.getJobById(data.id);

      const selectedWorksite = this.$store.getters.worksites.find((worksite) => worksite.name == this.job.worksite);
      const selectedEmployee = this.$store.getters.employees.find((employee) => employee.name == this.job.employee);
      const selectedEquipment = this.job.equipment ? this.$store.getters.equipments.filter((equipment) => equipment.name == this.job.equipment[0] || equipment.name == this.job.equipment[1] || equipment.name == this.job.equipment[2] || equipment.name == this.job.equipment[3] || equipment.name == this.job.equipment[4]) : [];

      const formData = {
        id: data.id,
      };

      try {
        await this.$store.dispatch('deleteJob', [formData, selectedWorksite, selectedEmployee, selectedEquipment]);
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
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
