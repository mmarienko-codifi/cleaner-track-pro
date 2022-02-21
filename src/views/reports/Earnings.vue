<template>
  <ErrorPopup v-if="error" :message="error" />
  <div class="reports" v-else>
    <div v-if="isLoading">
      <Spinner />
    </div>
    <form class="reports form" @submit.prevent="submitForm" v-else-if="hasJobs && hasWorksites && hasEquipments">
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
    <div class="list__not-found" v-else>No jobs found</div>
    <div class="table" v-if="report.value">
      <table>
        <thead>
          <tr>
            <th>Client</th>
            <th>Employee revenue</th>
            <th>Equipment revenue</th>
            <th>Total revenue</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in report.value" :key="row.id">
            <td>{{ this.$store.getters.getWorksiteById(row.worksite).client }}</td>
            <td>{{ row.service }}$</td>
            <td>{{ row.equipment.map(id => this.$store.getters.getEquipmentById(id).usage).reduce((previousValue, currentValue) => +previousValue + +currentValue, 0) }}$</td>
            <td>{{ +row.service + row.equipment.map(id => this.$store.getters.getEquipmentById(id).usage).reduce((previousValue, currentValue) => +previousValue + +currentValue, 0) }}$</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td><b>Total</b></td>
            <td>{{ total.value }}$</td>
            <td>{{ total2.value }}$</td>
            <td>{{ +total.value + +total2.value }}$</td>
          </tr>
        </tfoot>
      </table>
    </div>
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
      jobs: {
        value: [],
      },
      total: {
        value: 0,
      },
      total2: {
        value: 0,
      },
      formIsValid: true,
    };
  },
  async created() {
    this.isLoading = true;
    await this.loadJobs();
    await this.loadWorksites();
    await this.loadEquipments();
    this.isLoading = false;
  },
  computed: {
    getJobs() {
      return this.$store.getters.jobs;
    },
    hasJobs() {
      return !this.isLoading && this.$store.getters.hasJobs;
    },
    hasWorksites() {
      return !this.isLoading && this.$store.getters.hasWorksites;
    },
    hasEquipments() {
      return !this.isLoading && this.$store.getters.hasEquipments;
    },
  },
  methods: {
    checkDate(start_date, end_date, item_start_date, item_end_date) {
      function getDaysArray(start, end) {
        for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
          arr.push(new Date(dt).toISOString().slice(0, 10));
        }
        return arr;
      }

      let selectDate = getDaysArray(start_date, end_date);
      let itemDate = getDaysArray(item_start_date, item_end_date);

      return itemDate.find((item) => selectDate.find(item2 => item2 == item));
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
    async loadWorksites() {
      try {
        await this.$store.dispatch('loadWorksites');
      } catch (error) {
        if (error.message != 'Cannot convert undefined or null to object') {
          this.error = error.message || 'Something went wrong!';
        }
      }
    },
    async loadEquipments() {
      try {
        await this.$store.dispatch('loadEquipments');
      } catch (error) {
        if (error.message != 'Cannot convert undefined or null to object') {
          this.error = error.message || 'Something went wrong!';
        }
      }
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

      await this.loadJobs();

      const currentJobs = this.$store.getters.jobs.filter((job) => this.checkDate(start_date, end_date, job.start_date, job.end_date));
      
      const currentWorksites = [];
      
      this.$store.getters.worksites.forEach(worksite => {
        currentJobs.forEach(job => {
          if (worksite.id == job.worksite) currentWorksites.push(job);
        })
      })

      if (!currentWorksites[0]) {
        notify({type: 'error', title: "Nothing found!" });
        this.report.value = '';
        return
      }

      for (let i = 0; i < currentWorksites.length; i++) {
        const job = currentWorksites[i];
       
        if (job.worksite == currentWorksites[i + 1]?.worksite) {
          job.service = +job.service + +currentWorksites[i + 1].service;
          job.equipment = job.equipment.concat(currentWorksites[i + 1].equipment);
          currentWorksites.splice(i + 1, 1);
          i -= 1;
        }
      }

      this.report.value = currentWorksites;

      this.total.value = 0;

      this.report.value.map((row) => (this.total.value += +row.service));

      this.total2.value = 0;

      this.report.value.map((row) => (this.total2.value += row.equipment.map(id => this.$store.getters.getEquipmentById(id).usage).reduce((previousValue, currentValue) => +previousValue + +currentValue, 0)));
    },
  },
};
</script>
