<template>
  <ErrorPopup v-if="error" :message="error" />
  <div class="employees" v-else>
    <div v-if="isLoading">
      <Spinner />
    </div>
    <ul class="employees__list list" v-else-if="hasEmployees">
      <li class="list__item" :class="{'list__item--busy': this.$store.getters.hasJobs && getActiveJobs(employee).length > 0,'list__item--deactivated': !employee.status}" v-for="employee in getEmployees" :key="employee.id">
        <router-link class="list__link" :to="'/employees/' + employee.id + '/read'">
          <span class="list__title"> {{ employee.name }} | {{ employee.salary }}$ | {{ employee.phone }} </span>
          <router-link class="list__button button" :to="'/employees/' + employee.id + '/read'"> Details </router-link>
          <router-link class="list__button button button--edit" :to="'/employees/' + employee.id + '/update'"> Edit </router-link>
          <a class="list__button button button--delete" v-if="employee.status == true" @click.prevent="deleteEmployee(employee)"> Deactivate </a>
          <a class="list__button button button--activate" v-else @click.prevent="activateEmployee(employee)"> Activate </a>
        </router-link>
        <span class="list__busy" v-if="this.$store.getters.hasJobs && getActiveJobs(employee).length == 1"> has one job </span>
        <span class="list__busy" v-else-if="this.$store.getters.hasJobs && getActiveJobs(employee).length > 1"> has many jobs </span>
        <span class="list__deactivated" v-if="!employee.status"> deactivated </span>
      </li>
    </ul>
    <div class="list__not-found" v-else>No employees found</div>
    <router-link class="employees__button button" :to="'/employees/create'" v-if="!isLoading"> Create employee </router-link>
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
    await this.loadJobs();
    await this.loadEmployees();
  },
  computed: {
    getEmployees() {
      return this.$store.getters.employees;
    },
    hasEmployees() {
      return !this.isLoading && this.$store.getters.hasEmployees;
    },
  },
  methods: {
    getActiveJobs(employee) {
      return this.$store.getters.jobs.filter((job) => job.employee == employee.id && job.status);
    },
    async loadEmployees() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('loadEmployees');
      } catch (error) {
        if (error.message != 'Cannot convert undefined or null to object') {
          this.error = error.message || 'Something went wrong!';
        }
      }
      this.isLoading = false;
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
    async deleteEmployee(data) {
      this.isLoading = true;

      if (this.$store.getters.hasJobs && this.getActiveJobs(data).length > 0) {
        notify({type: 'error', title: "The employee has jobs. You cannot deactivate it." });
        this.isLoading = false;
        return;
      }

      const formData = this.$store.getters.getEmployeeById(data.id);

      formData.status = false;

      try {
        await this.$store.dispatch('editEmployee', formData);
      } catch (error) {
        if (error.message != 'Cannot convert undefined or null to object') {
          this.error = error.message || 'Something went wrong!';
        }
      }
      this.isLoading = false;
      this.$router.replace('/employees/list');
    },
    async activateEmployee(data) {
      this.isLoading = true;

      const formData = this.$store.getters.getEmployeeById(data.id);
      
      formData.status = true;

      try {
        await this.$store.dispatch('editEmployee', formData);
      } catch (error) {
        if (error.message != 'Cannot convert undefined or null to object') {
          this.error = error.message || 'Something went wrong!';
        }
      }
      this.isLoading = false;
      this.$router.replace('/employees/list');
    },
  },
};
</script>

<style lang="scss" scoped>
.employees {
  &__button {
    padding: 7px 10px;
    width: 100%;

    border-radius: 0 0 var(--border-radius) var(--border-radius);
  }
}
</style>
