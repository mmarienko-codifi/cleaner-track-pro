<template>
  <ErrorPopup v-if="error" :message="error" />
  <div class="employee" v-else>
    <form class="employee__form form" @submit.prevent="submitForm">
      <div class="form__field" :class="{ 'form__field--invalid': !name.isValid }">
        <label class="form__label">
          <span class="form__span">Name</span>
          <input class="form__input" name="name" type="text" v-model.trim="name.value" @blur="validateName()" />
          <p class="form__error" v-if="!name.isValid">Name must not be empty</p>
        </label>
      </div>
      <div class="form__field" :class="{ 'form__field--invalid': !address.isValid }">
        <label class="form__label">
          <span class="form__span">Address</span>
          <input class="form__input" name="address" type="text" v-model.trim="address.value" @blur="validateAddress()" />
          <p class="form__error" v-if="!address.isValid">Address must not be empty</p>
        </label>
      </div>
      <div class="form__field" :class="{ 'form__field--invalid': !phone.isValid }">
        <label class="form__label">
          <span class="form__span">Phone</span>
          <input class="form__input" name="phone" type="tel" v-model.trim="phone.value" @blur="validatePhone()" />
          <p class="form__error" v-if="!phone.isValid">Phone is not a number or empty</p>
        </label>
      </div>
      <div class="form__field" :class="{ 'form__field--invalid': !salary.isValid }">
        <label class="form__label">
          <span class="form__span">Monthly salary ($)</span>
          <input class="form__input" name="salary" type="text" v-model.trim="salary.value" @blur="validateSalary()" />
          <p class="form__error" v-if="!salary.isValid">Salary is not a number or empty</p>
        </label>
      </div>
      <div class="form__field" :class="{ 'form__field--invalid': !date.isValid }">
        <label class="form__label">
          <span class="form__span">Date of birth</span>
          <input class="form__input" name="date" type="date" v-model.trim="date.value" @blur="validateDate()" />
          <p class="form__error" v-if="!date.isValid">Date later than today or empty</p>
        </label>
      </div>
      <div class="form__field" :class="{ 'form__field--invalid': !status.isValid }">
        <div class="form__label">
          <span class="form__span">Status</span>
          <label class="form__checkbox">
            <input class="form__checkbox-input" name="status" type="checkbox" v-model="status.value" checked @blur="validateStatus()" />
            <span class="form__checkbox-span"></span>
          </label>
          <p class="form__error" v-if="!status.isValid">Status must not be empty</p>
        </div>
      </div>
      <button class="form__button button">Create</button>
    </form>
  </div>
</template>

<script>
import ErrorPopup from '@/components/ErrorPopup.vue';

export default {
  components: {
    ErrorPopup,
  },
  data() {
    return {
      error: null,
      name: {
        value: '',
        isValid: true,
      },
      address: {
        value: '',
        isValid: true,
      },
      phone: {
        value: '',
        isValid: true,
      },
      salary: {
        value: '',
        isValid: true,
      },
      date: {
        value: '',
        isValid: true,
      },
      status: {
        value: true,
        isValid: true,
      },
      formIsValid: true,
    };
  },
  methods: {
    validateName() {
      if (this.name.value == '') {
        this.name.isValid = false;
        return false;
      } else {
        this.name.isValid = true;
        return true;
      }
    },
    validateAddress() {
      if (this.address.value == '') {
        this.address.isValid = false;
        return false;
      } else {
        this.address.isValid = true;
        return true;
      }
    },
    validatePhone() {
      if (!/^[+ 0-9]+$/.test(this.phone.value) || this.phone.value == '') {
        this.phone.isValid = false;
        return false;
      } else {
        this.phone.isValid = true;
        return true;
      }
    },
    validateSalary() {
      if (!/^[ 0-9]+$/.test(this.salary.value) || this.salary.value == '') {
        this.salary.isValid = false;
        return false;
      } else {
        this.salary.isValid = true;
        return true;
      }
    },
    validateDate() {
      if (Date.parse(this.date.value) > Date.now() && this.date.value) {
        this.date.isValid = false;
        return false;
      } 
      if (!this.date.value) {
        this.date.isValid = false;
        return false;
      } else {
        this.date.isValid = true;
        return true;
      }
    },
    validateStatus() {
      if (this.status.value == undefined) {
        this.status.isValid = false;
        return false;
      } else {
        this.status.isValid = true;
        return true;
      }
    },
    validateForm() {
      this.formIsValid = true;
      if (!this.validateName()) {
        this.formIsValid = false;
      }
      if (!this.validateAddress()) {
        this.formIsValid = false;
      }
      if (!this.validatePhone()) {
        this.formIsValid = false;
      }
      if (!this.validateSalary()) {
        this.formIsValid = false;
      }
      if (!this.validateDate()) {
        this.formIsValid = false;
      }
      if (!this.validateStatus()) {
        this.formIsValid = false;
      }
    },
    async submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      const formData = {
        name: this.name.value,
        address: this.address.value,
        phone: this.phone.value,
        salary: this.salary.value,
        date: this.date.value,
        status: this.status.value,
      };

      try {
        await this.$store.dispatch('addEmployee', formData);
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
        return;
      }

      this.$router.replace('/employees/list');
    },
  },
};
</script>
