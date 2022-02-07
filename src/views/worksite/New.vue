<template>
  <ErrorPopup v-if="error" :message="error" />
  <div class="worksite" v-else>
    <div v-if="isLoading">
      <Spinner />
    </div>
    <form class="worksite__form form" @submit.prevent="submitForm"  v-else-if="hasClients">
      <div class="form__field" :class="{ 'form__field--invalid': !client.isValid }">
        <label class="form__label">
          <span class="form__span">Client</span>
          <select class="form__select" v-model="client.value" v-if="getClients.length != 0" @blur="validateClient()">
            <option :value="client.name" v-for="client in getClients" :key="client.id">{{ client.name }}</option>
          </select>
          <span class="form__info" v-else>Clients are not found</span>
          <p class="form__error" v-if="!client.isValid">Client must not be empty</p>
        </label>
      </div>
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
      <div class="form__field" :class="{ 'form__field--invalid': !type.isValid }">
        <label class="form__label">
          <span class="form__span">Type</span>
          <select class="form__select" v-model="type.value" @blur="validateType()">
            <option value="Office">Office</option>
            <option value="Residential building">Residential building</option>
            <option value="Personal home">Personal home</option>
            <option value="Individual apartment">Individual apartment</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Warehouse">Warehouse</option>
            <option value="Outdoor">Outdoor</option>
            <option value="Field">Field</option>
          </select>
          <p class="form__error" v-if="!type.isValid">Type must not be empty</p>
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
      client: {
        value: '',
        isValid: true,
      },
      name: {
        value: '',
        isValid: true,
      },
      address: {
        value: '',
        isValid: true,
      },
      type: {
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
  async created() {
    this.isLoading = true;
    await this.loadClients();
    this.isLoading = false;
  },
  computed: {
    getClients() {
      return this.$store.getters.clients.filter((client) => client.status);
    },
  },
  methods: {
    async loadClients() {
      try {
        await this.$store.dispatch('loadClients');
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
    },
    hasClients() {
      return !this.isLoading && this.$store.getters.hasClients;
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
      if (!this.validateClient()) {
        this.formIsValid = false;
      }
      if (!this.validateName()) {
        this.formIsValid = false;
      }
      if (!this.validateAddress()) {
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
        client: this.client.value,
        name: this.name.value,
        address: this.address.value,
        type: this.type.value,
        status: this.status.value,
      };

      try {
        await this.$store.dispatch('addWorksite', formData);
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
        return;
      }

      this.$router.replace('/worksites/list');
    },
  },
};
</script>
