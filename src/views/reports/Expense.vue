<template>
  <ErrorPopup v-if="error" :message="error" />
  <div class="reports" v-else>
    <div v-if="isLoading">
      <Spinner />
    </div>
    <form class="reports form" @submit.prevent="submitForm" v-else-if="hasEmployees">
      <div class="form__field" :class="{ 'form__field--invalid': !month.isValid }">
        <label class="form__label">
          <span class="form__span">Month</span>
          <select class="form__select" v-model="month.value" @blur="validateMonth()">
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
          <p class="form__error" v-if="!month.isValid">Month must not be empty</p>
        </label>
      </div>
      <div class="form__field" :class="{ 'form__field--invalid': !year.isValid }">
        <label class="form__label">
          <span class="form__span">Year</span>
          <select class="form__select" v-model="year.value" @blur="validateYear()">
            <option :value="new Date().getFullYear()">{{ new Date().getFullYear() }}</option>
            <option :value="new Date().getFullYear() - 1">{{ new Date().getFullYear() - 1 }}</option>
            <option :value="new Date().getFullYear() - 2">{{ new Date().getFullYear() - 2 }}</option>
            <option :value="new Date().getFullYear() - 3">{{ new Date().getFullYear() - 3 }}</option>
            <option :value="new Date().getFullYear() - 4">{{ new Date().getFullYear() - 4 }}</option>
            <option :value="new Date().getFullYear() - 5">{{ new Date().getFullYear() - 5 }}</option>
            <option :value="new Date().getFullYear() - 6">{{ new Date().getFullYear() - 6 }}</option>
            <option :value="new Date().getFullYear() - 7">{{ new Date().getFullYear() - 7 }}</option>
            <option :value="new Date().getFullYear() - 8">{{ new Date().getFullYear() - 8 }}</option>
            <option :value="new Date().getFullYear() - 9">{{ new Date().getFullYear() - 9 }}</option>
          </select>
          <p class="form__error" v-if="!year.isValid">Year must not be empty</p>
        </label>
      </div>
      <button class="form__button button">Create report</button>
    </form>
    <div class="list__not-found" v-else>No employees found</div>
    <div class="table" v-if="report.value">
      <table>
        <thead>
          <tr>
            <th>Employee name</th>
            <th>Employee salary</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in report.value" :key="row.id">
            <td>{{ row.name }}</td>
            <td>{{ row.salary }}$</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td><b>Total</b></td>
            <td>{{ total.value }}$</td>
          </tr>
        </tfoot>
      </table>
    </div>
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
      month: {
        value: '',
        isValid: true,
      },
      year: {
        value: '',
        isValid: true,
      },
      report: {
        value: '',
      },
      total: {
        value: 0,
      },
      formIsValid: true,
    };
  },
  async created() {
    this.isLoading = true;
    await this.loadEmployees();
    await this.loadJobs();
    this.isLoading = false;
  },
  computed: {
    getEmployees() {
      return this.$store.getters.employees;
    },
    hasEmployees() {
      return !this.isLoading && this.$store.getters.hasEmployees;
    },
    getJobs() {
      return this.$store.getters.jobs;
    },
    hasJobs() {
      return !this.isLoading && this.$store.getters.hasJobs;
    },
  },
  methods: {
    async loadEmployees() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('loadEmployees');
      } catch (error) {
        if (error.message != 'Cannot convert undefined or null to object') {
          if (error.message != 'Cannot convert undefined or null to object') {
          this.error = error.message || 'Something went wrong!';
        }
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
          if (error.message != 'Cannot convert undefined or null to object') {
          this.error = error.message || 'Something went wrong!';
        }
        }
      }
      this.isLoading = false;
    },
    validateMonth() {
      if (!this.month.value) {
        this.month.isValid = false;
        return false;
      } else {
        this.month.isValid = true;
        return true;
      }
    },
    validateYear() {
      if (!this.year.value) {
        this.year.isValid = false;
        return false;
      } else {
        this.year.isValid = true;
        return true;
      }
    },
    validateForm() {
      this.formIsValid = true;
      if (!this.validateMonth()) {
        this.formIsValid = false;
      }
      if (!this.validateYear()) {
        this.formIsValid = false;
      }
    },
    async submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      const start_date = this.year.value + '-' + this.month.value + '-' + '01';
      const end_date = this.year.value + '-' + this.month.value + '-' + '31';

      this.report.value = [];

      var getDaysArray = function (start, end) {
        for (var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
          arr.push(new Date(dt).toISOString().slice(0, 10));
        }
        return arr;
      };

      function isInArray(array, value) {
        return (
          (
            array.find((item) => {
              return item == value;
            }) || []
          ).length > 0
        );
      }

      function checkDate(start_date, end_date, item_start_date, item_end_date) {
        let includes = false;
        let selectDate = getDaysArray(new Date(start_date), new Date(end_date));
        let itemDate = getDaysArray(new Date(item_start_date), new Date(item_end_date));

        itemDate.map((item) => {
          if (isInArray(selectDate, item)) {
            includes = true;
          }
        });

        return includes;
      }

      this.$store.getters.jobs
        .filter((job) => checkDate(start_date, end_date, job.start_date, job.end_date))
        .map((job) => {
          this.report.value.push(this.$store.getters.employees.find((employee) => employee.id == job.employee));
        });

      this.total.value = 0;

      this.report.value.map((row) => (this.total.value += +row.salary));
    },
  },
};
</script>
