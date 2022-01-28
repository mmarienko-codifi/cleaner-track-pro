<template>
  <ErrorPopup v-if="error" :message="error" />
  <div class="job" v-else>
    <form class="job__form form" @submit.prevent="submitForm">
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
          <input class="form__input" name="phone" type="text" v-model.trim="phone.value" @blur="validatePhone()" />
          <p class="form__error" v-if="!phone.isValid">Phone must not be empty</p>
        </label>
      </div>
      <div class="form__field" :class="{ 'form__field--invalid': !person.isValid }">
        <label class="form__label">
          <span class="form__span">Person</span>
          <input class="form__input" name="person" type="text" v-model.trim="person.value" @blur="validatePerson()" />
          <p class="form__error" v-if="!person.isValid">Person must not be empty</p>
        </label>
      </div>
      <div class="form__field" :class="{ 'form__field--invalid': !type.isValid }">
        <label class="form__label">
          <span class="form__span">Type</span>
          <div class="form__radio">
            <div class="form__radio-item">
              <label class="form__radio-label">
                <input
                  class="form__radio-input"
                  name="type"
                  type="radio"
                  value="company"
                  checked
                  v-model="type.value"
                  @blur="validateType()"
                />
                <span class="form__radio-span">Company</span>
              </label>
            </div>
            <div class="form__radio-item">
              <label class="form__radio-label">
                <input class="form__radio-input" name="type" type="radio" value="personal" v-model="type.value" @blur="validateType()" />
                <span class="form__radio-span">Personal</span>
              </label>
            </div>
          </div>
          <p class="form__error" v-if="!type.isValid">At least one expertise must be selected</p>
        </label>
      </div>
      <div class="form__field" :class="{ 'form__field--invalid': !status.isValid }">
        <label class="form__label">
          <span class="form__span">Active</span>
          <div class="form__checkbox">
            <input class="form__checkbox-input" name="status" type="checkbox" v-model="status.value" checked @blur="validateStatus()" />
            <span class="form__checkbox-span"></span>
          </div>
          <p class="form__error" v-if="!status.isValid">Active must not be empty</p>
        </label>
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
      person: {
        value: '',
        isValid: true,
      },
      type: {
        value: 'company',
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
      if (this.phone.value == '') {
        this.phone.isValid = false;
        return false;
      } else {
        this.phone.isValid = true;
        return true;
      }
    },
    validatePerson() {
      if (this.person.value == '') {
        this.person.isValid = false;
        return false;
      } else {
        this.person.isValid = true;
        return true;
      }
    },
    validateType() {
      if (!this.type.value) {
        this.type.isValid = false;
        return false;
      } else {
        this.type.isValid = true;
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
      if (!this.validatePerson()) {
        this.formIsValid = false;
      }
      if (!this.validateType()) {
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
        person: this.person.value,
        type: this.type.value,
        status: this.status.value,
      };

      try {
        await this.$store.dispatch('addJob', formData);
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
        return;
      }

      this.$router.replace('/jobs/list');
    },
  },
};
</script>
