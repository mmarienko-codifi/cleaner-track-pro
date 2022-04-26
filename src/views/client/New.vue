<template>
  <ErrorPopup v-if="error" :message="error" />
  <div class="client" v-else>
    <form class="client__form form" @submit.prevent="submitForm">
      <div class="form__field" :class="{ 'form__field--invalid': !name.isValid }">
        <label class="form__label">
          <span class="form__span">Name</span>
          <input class="form__input" name="name" type="text" v-model.trim="name.value" @blur="validateName()" />
          <p class="form__error" v-if="!name.isValid">Name must not be empty</p>
        </label>
      </div>
      <div class="form__field" :class="{ 'form__field--invalid': !address.isValid }">
        <label class="form__label">
          <span class="form__span">Primary address</span>
          <input class="form__input" name="address" type="text" v-model.trim="address.value" @blur="validateAddress()" />
          <p class="form__error" v-if="!address.isValid">Address must not be empty</p>
        </label>
      </div>
      <div class="form__field" :class="{ 'form__field--invalid': !phone.isValid }">
        <label class="form__label">
          <span class="form__span">Contact phone</span>
          <input class="form__input" name="phone" type="tel" v-model.trim="phone.value" @blur="validatePhone()" />
          <p class="form__error" v-if="!phone.isValid">Phone is not a number or empty</p>
        </label>
      </div>
      <div class="form__field" :class="{ 'form__field--invalid': !person.isValid }">
        <label class="form__label">
          <span class="form__span">Contact person</span>
          <input class="form__input" name="person" type="text" v-model.trim="person.value" @blur="validatePerson()" />
          <p class="form__error" v-if="!person.isValid">Person must not be empty</p>
        </label>
      </div>
      <div class="form__field" :class="{ 'form__field--invalid': !type.isValid }">
        <label class="form__label">
          <span class="form__span">Type</span>
          <select class="form__select" v-model="type.value" @blur="validateType()">
            <option value="Company" selected>Company</option>
            <option value="Personal">Personal</option>
          </select>
          <p class="form__error" v-if="!type.isValid">Type must not be empty</p>
        </label>
      </div>
      <button class="form__button button">Create</button>
    </form>
  </div>
</template>

<script>
import ErrorPopup from '@/components/ErrorPopup.vue';
import { notify } from "@kyvg/vue3-notification";

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
        value: '',
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
        status: true,
      };

      try {
        await this.$store.dispatch('addClient', formData);
      } catch (error) {
        if (error.message != "Cannot read properties of undefined (reading 'push')") {
          this.error = error.message || 'Something went wrong!';
          return;
        }
      }

      notify({type: 'success', title: "The client was added!" });

      this.$router.replace('/clients/list');
    },
  },
};
</script>
