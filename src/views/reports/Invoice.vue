<template>
  <ErrorPopup v-if="error" :message="error" />
  <div class="reports" v-else>
    <div v-if="isLoading">
      <Spinner />
    </div>
    <form class="reports form" @submit.prevent="submitForm" v-else-if="hasJobs">
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
      <div class="form__field" :class="{ 'form__field--invalid': !client.isValid }">
        <label class="form__label">
          <span class="form__span">Client</span>
          <select class="form__select" v-model="client.value" @blur="validateClient()">
            <option :value="client.id" v-for="client in getClients" :key="client.id">{{ client.name }}</option>
          </select>
          <p class="form__error" v-if="!year.isValid">Client must not be empty</p>
        </label>
      </div>
      <button class="form__button button">Create report</button>
    </form>
    <div class="list__not-found" v-else>No jobs found</div>
    <div class="table" v-if="report.value">
      <table>
        <thead>
          <tr>
            <th>Worksite name</th>
            <th>Employee name</th>
            <th>Equipment used</th>
            <th>Employee job cost</th>
            <th>Equipment cost</th>
            <th>Total cost</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row) in report.value" :key="row.id">
            <td>{{ this.$store.getters.getWorksiteById(row.worksite).name }}</td>
            <td>{{ this.$store.getters.getEmployeeById(row.employee).name }}</td>
            <td v-if="Array.isArray(row.equipment)">{{ row.equipment.map(id => this.$store.getters.getEquipmentById(id).name + ' (' + this.$store.getters.getEquipmentById(id).usage + '$)').join(', ') }}</td>
            <td v-else>{{ this.$store.getters.getEquipmentById(row.equipment).name }}</td>
            <td>{{ row.employee_cost.salary }}$</td>
            <td>{{ row.equipment_cost }}$</td>
            <td><b>{{ +row.equipment_cost + +row.employee_cost.salary }}$</b></td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3"><b>Total</b></td>
            <td>{{ total1.value }}$</td>
            <td>{{ total2.value }}$</td>
            <td><b>{{ total.value }}$</b></td>
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
      client: {
        value: '',
        isValid: true,
      },
      jobs: {
        value: [],
      },
      report: {
        value: '',
      },
      total: {
        value: 0,
      },
      total1: {
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
    await this.loadClients();
    await this.loadJobs();
    await this.loadEquipments();
    await this.loadEmployees();
    await this.loadWorksites();
    this.isLoading = false;
  },
  computed: {
    getClients() {
      return this.$store.getters.clients.filter(client => client.status);
    },
    hasClients() {
      return !this.isLoading && this.$store.getters.hasClients;
    },
    getJobs() {
      return this.$store.getters.jobs;
    },
    hasJobs() {
      return !this.isLoading && this.$store.getters.hasJobs;
    },
    getEmployees() {
      return this.$store.getters.employees;
    },
    hasEmployees() {
      return !this.isLoading && this.$store.getters.hasEmployees;
    },
    getEquipments() {
      return this.$store.getters.equipments;
    },
    hasEquipments() {
      return !this.isLoading && this.$store.getters.hasEquipments;
    },
  },
  methods: {
    async loadClients() {
      try {
        await this.$store.dispatch('loadClients');
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
    async loadEquipments() {
      try {
        await this.$store.dispatch('loadEquipments');
      } catch (error) {
        if (error.message != 'Cannot convert undefined or null to object') {
          this.error = error.message || 'Something went wrong!';
        }
      }
    },
    async loadEmployees() {
      try {
        await this.$store.dispatch('loadEmployees');
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
    validateClient() {
      if (this.client.value == '') {
        this.client.isValid = false;
        return false;
      } else {
        this.client.isValid = true;
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
      if (!this.validateClient()) {
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

      this.jobs.value = this.$store.getters.jobs.filter((job) => this.checkDate(start_date, end_date, job.start_date, job.end_date) && this.$store.getters.getWorksiteById(job.worksite).client == this.client.value );
      
      if (!this.jobs.value[0]) {
        notify({type: 'error', title: "Nothing found!" });
        this.report.value = '';
        return
      }
        
      this.$store.getters.worksites.forEach(worksite => {
        this.jobs.value.forEach(job => {
          if (worksite.id == job.worksite) this.report.value.push(job);
        })
      })

      this.$store.getters.jobs
        .filter((job) => this.checkDate(start_date, end_date, job.start_date, job.end_date)  && this.$store.getters.getWorksiteById(job.worksite).client == this.client.value )
        .map((job, i) => {
          this.jobs.value[i].employee_cost = this.$store.getters.employees.find((employee) => employee.id == job.employee);
        });
      this.$store.getters.jobs
        .filter((job) => this.checkDate(start_date, end_date, job.start_date, job.end_date)  && this.$store.getters.getWorksiteById(job.worksite).client == this.client.value )
        .map((job, i) => {
          this.jobs.value[i].equipment_cost = this.$store.getters.equipments.filter(
            (equipment) =>
              (Array.isArray(job.equipment) && equipment.id == job.equipment[0]) ||
              (Array.isArray(job.equipment) && equipment.id == job.equipment[1]) ||
              (Array.isArray(job.equipment) && equipment.id == job.equipment[2]) ||
              (Array.isArray(job.equipment) && equipment.id == job.equipment[3]) ||
              (Array.isArray(job.equipment) && equipment.id == job.equipment[4]) ||
              (Array.isArray(job.equipment) && equipment.id == job.equipment[5]) ||
              (Array.isArray(job.equipment) && equipment.id == job.equipment[6])
          );
        });

      

      this.jobs.value.forEach((element) => {
        let accum = 0;
        element.equipment_cost.forEach((current) => {
          accum = +current.usage + accum;
        });

        element.equipment_cost = accum;
      });

      this.jobs.value = this.$store.getters.jobs.filter((job) => this.checkDate(start_date, end_date, job.start_date, job.end_date) && this.$store.getters.getWorksiteById(job.worksite).client == this.client.value );

      

      this.jobs.value.map((row) => (this.total.value += +row.service));

      this.total1.value = 0;

      this.jobs.value.map((row) => (this.total1.value += +row.employee_cost.salary));

      this.total2.value = 0;

      this.jobs.value.map((row) => (this.total2.value += +row.equipment_cost));

      this.total.value = +this.total1.value + +this.total2.value;
    },
  },
};
</script>
