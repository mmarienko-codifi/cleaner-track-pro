<template>
  <ErrorPopup v-if="error" :message="error" />
  <div class="job" v-else>
    <div v-if="isLoading">
      <Spinner />
    </div>
    <form class="job__form form" @submit.prevent="submitForm" v-else-if="hasEquipments && hasWorksites && hasEmployees">
      <div class="form__field" :class="{ 'form__field--invalid': !worksite.isValid }">
        <label class="form__label">
          <span class="form__span">Worksite</span>
          <select class="form__select" v-model="worksite.value" v-if="getWorksites.length != 0" @blur="validateWorksite()">
            <option :value="worksite.id" v-for="worksite in getWorksites" :key="worksite.id">{{ worksite.name }}</option>
          </select>
          <span class="form__info" v-else>Worksites are not found</span>
          <p class="form__error" v-if="!worksite.isValid">Worksite must not be empty</p>
        </label>
      </div>
      <div class="form__field" :class="{ 'form__field--invalid': !type.isValid }">
        <label class="form__label">
          <span class="form__span">Type</span>
          <select class="form__select" v-model="type.value" @blur="validateType()">
            <option value="Office cleaning">Office cleaning</option>
            <option value="Home cleaning">Home cleaning</option>
            <option value="Deep cleaning">Deep cleaning</option>
            <option value="Industrial area cleaning">Industrial area cleaning</option>
            <option value="Outdoor cleaning">Outdoor cleaning</option>
          </select>
          <p class="form__error" v-if="!type.isValid">Type must not be empty</p>
        </label>
      </div>
      <div class="form__field" :class="{ 'form__field--invalid': !hazardous.isValid }">
        <div class="form__label">
          <span class="form__span">Hazardous materials</span>
          <label class="form__checkbox form__checkbox--hazardous">
            <input class="form__checkbox-input" name="hazardous" type="checkbox" v-model="hazardous.value" @blur="validateHazardous()" />
            <span class="form__checkbox-span"></span>
          </label>
          <p class="form__error" v-if="!hazardous.isValid">Hazardous materials must not be empty</p>
        </div>
      </div>
      <div class="form__field" :class="{ 'form__field--invalid': !employee.isValid }">
        <label class="form__label">
          <span class="form__span">Employee</span>
          <select class="form__select" v-model="employee.value" v-if="getEmployees.length != 0" @blur="validateEmployee()">
            <option :value="employee.id" v-for="employee in getEmployees" :key="employee.id">{{ employee.name }}</option>
          </select>
          <span class="form__info" v-else>Employees are not found</span>
          <p class="form__error" v-if="!employee.isValid">Employee must not be empty</p>
        </label>
      </div>
      <div class="form__field" :class="{ 'form__field--invalid': !service.isValid }">
        <label class="form__label">
          <span class="form__span">Monthly fee ($)</span>
          <input class="form__input" name="service" type="text" v-model.trim="service.value" @blur="validateService()" />
          <p class="form__error" v-if="!service.isValid">Service fee is not a number or empty</p>
        </label>
      </div>
      <div class="form__field" :class="{ 'form__field--invalid': !equipments.isValid }">
        <div class="form__label">
          <span class="form__span">Additional equipment</span>
          <div class="form__checkboxes" v-if="getEquipments.length != 0">
            <label class="form__checkboxes-item" v-for="equipment in getEquipments" :key="equipment.id">
              <input
                class="form__checkboxes-input"
                type="checkbox"
                name="equipments[]"
                :value="equipment.id"
                v-model="equipments.value"
                @blur="validateEquipment()"
              />
              <span class="form__checkboxes-span">{{ equipment.name }}</span>
            </label>
          </div>
          <span class="form__info" v-else>Equipment are not found</span>
          <p class="form__error" v-if="!equipments.isValid">Equipment must not be empty</p>
        </div>
      </div>
      <div class="form__field" :class="{ 'form__field--invalid': !start_date.isValid }">
        <label class="form__label">
          <span class="form__span">Start date</span>
          <input class="form__input" name="start_date" type="date" v-model.trim="start_date.value" @blur="validateStartdate()" />
          <p class="form__error" v-if="!start_date.isValid">Start date later than End date or empty</p>
        </label>
      </div>
      <div class="form__field" :class="{ 'form__field--invalid': !end_date.isValid }">
        <label class="form__label">
          <span class="form__span">End date</span>
          <input class="form__input" name="end_date" type="date" v-model.trim="end_date.value" @blur="validateEnddate()" />
          <p class="form__error" v-if="!end_date.isValid">End date earlier than Start date or empty</p>
        </label>
      </div>
      <button class="form__button button">Create</button>
    </form>
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
      worksite: {
        value: '',
        isValid: true,
      },
      type: {
        value: '',
        isValid: true,
      },
      hazardous: {
        value: false,
        isValid: true,
      },
      employee: {
        value: '',
        isValid: true,
      },
      service: {
        value: '',
        isValid: true,
      },
      equipments: {
        value: [],
        isValid: true,
      },
      start_date: {
        value: '',
        isValid: true,
      },
      end_date: {
        value: '',
        isValid: true,
      },
      formIsValid: true,
    };
  },
  async created() {
    this.isLoading = true;
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
      return this.$store.getters.employees.filter((employee) => employee.status);
    },
    getEquipments() {
      return this.$store.getters.equipments.filter((equipment) => equipment.status);
    },
    hasWorksites() {
      return !this.isLoading && this.$store.getters.hasWorksites;
    },
    hasEmployees() {
      return !this.isLoading && this.$store.getters.hasEmployees;
    },
    hasEquipments() {
      return !this.isLoading && this.$store.getters.hasEquipments;
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
    validateWorksite() {
      if (this.worksite.value == '') {
        this.worksite.isValid = false;
        return false;
      } else {
        this.worksite.isValid = true;
        return true;
      }
    },
    validateType() {
      if (this.type.value == '') {
        this.type.isValid = false;
        return false;
      } else {
        this.type.isValid = true;
        return true;
      }
    },
    validateHazardous() {
      if (this.hazardous.value == undefined) {
        this.hazardous.isValid = false;
        return false;
      } else {
        this.hazardous.isValid = true;
        return true;
      }
    },
    validateEmployee() {
      if (this.employee.value == '') {
        this.employee.isValid = false;
        return false;
      } else {
        this.employee.isValid = true;
        return true;
      }
    },
    validateService() {
      if (!/^[ 0-9]+$/.test(this.service.value) || this.service.value == '') {
        this.service.isValid = false;
        return false;
      } else {
        this.service.isValid = true;
        return true;
      }
    },
    validateEquipment() {
      this.equipments.isValid = true;
      return true;
    },
    validateStartdate() {
      if (Date.parse(this.start_date.value) >= Date.parse(this.end_date.value) && this.end_date.value) {
        this.start_date.isValid = false;
        return false;
      } 
      if (!this.start_date.value) {
        this.start_date.isValid = false;
        return false;
      } else {
        this.start_date.isValid = true;
        return true;
      }
    },
    validateEnddate() {
      if (Date.parse(this.start_date.value) >= Date.parse(this.end_date.value) && this.start_date.value) {
        this.end_date.isValid = false;
        return false;
      }
      if (!this.end_date.value) {
        this.end_date.isValid = false;
        return false;
      } else {
        this.end_date.isValid = true;
        return true;
      }
    },
    validateForm() {
      this.formIsValid = true;
      if (!this.validateWorksite()) {
        this.formIsValid = false;
      }
      if (!this.validateType()) {
        this.formIsValid = false;
      }
      if (!this.validateHazardous()) {
        this.formIsValid = false;
      }
      if (!this.validateEmployee()) {
        this.formIsValid = false;
      }
      if (!this.validateService()) {
        this.formIsValid = false;
      }
      if (!this.validateEquipment()) {
        this.formIsValid = false;
      }
      if (!this.validateStartdate()) {
        this.formIsValid = false;
      }
      if (!this.validateEnddate()) {
        this.formIsValid = false;
      }
    },
    async submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      const formData = {
        id: new Date().getTime().toString(),
        worksite: this.worksite.value,
        type: this.type.value,
        hazardous: this.hazardous.value,
        employee: this.employee.value,
        service: this.service.value,
        equipment: this.equipments.value,
        start_date: this.start_date.value,
        end_date: this.end_date.value,
        status: true,
      };

      const selectedWorksite = this.$store.getters.worksites.find((worksite) => worksite.id == this.worksite.value);
      selectedWorksite.link = formData.id;

      try {
        await this.$store.dispatch('addJob', formData);
      } catch (error) {
        if (error.message != "Cannot read properties of undefined (reading 'push')") {
          this.error = error.message || 'Something went wrong!';
          return;
        }
      }

      try {
        await this.$store.dispatch('editWorksite', selectedWorksite);
      } catch (error) {
        if (error.message != "Cannot read properties of undefined (reading 'push')") {
          this.error = error.message || 'Something went wrong!';
          return;
        }
      }

      notify({type: 'success', title: "The job was added!" });

      this.$router.replace('/jobs/list');
    },
  },
};
</script>
