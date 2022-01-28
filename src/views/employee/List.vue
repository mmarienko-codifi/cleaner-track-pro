<template>
  <ErrorPopup v-if="error" :message="error" />
  <div class="employees" v-else>
    <div v-if="isLoading">
      <Spinner />
    </div>
    <ul class="employees__list list" v-else-if="hasEmployees">
      <li class="list__item" :class="employee.status ? '' : 'list__item--deactivated'" v-for="employee in getEmployees" :key="employee.id">
        <router-link class="list__link" :to="'/employees/' + employee.id + '/read'">
          <span class="list__title"> {{ employee.name }} ({{ employee.person }}) </span>
          <router-link class="list__button button" :to="'/employees/' + employee.id + '/read'"> Read </router-link>
          <router-link class="list__button button button--edit" :to="'/employees/' + employee.id + '/update'"> Update </router-link>
          <router-link class="list__button button button--delete" :to="'/employees/' + employee.id + '/delete'"> Delete </router-link>
        </router-link>
        <span class="list__deactivated" v-if="!employee.status"> deactivated </span>
      </li>
    </ul>
    <div class="list__not-found" v-else>No employees found</div>
    <router-link class="employees__button button" :to="'/employees/create'" v-if="!isLoading"> New employee </router-link>
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
    this.loadEmployees();
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
    async loadEmployees() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('loadEmployees');
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
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
