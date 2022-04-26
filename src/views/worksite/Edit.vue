<template>
  <div class="worksite" v-if="this.worksite">
    <div v-if="isLoading">
      <Spinner />
    </div>
    <form class="worksite__form form" @submit.prevent="submitForm"  v-else-if="hasClients">
      <div class="form__field" :class="{ 'form__field--invalid': !client.isValid }">
        <label class="form__label">
          <span class="form__span">Client</span>
          <select class="form__select" v-model="client.value" v-if="getClients.length != 0" @blur="validateClient()">
            <option :value="client.id" v-for="client in getClients" :key="client.id">{{ client.name }}</option>
          </select>
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
            <option value="Office" selected>Office</option>
            <option value="Residential building">Residential building</option>
            <option value="Personal home">Personal home</option>
            <option value="Individual apartment">Individual apartment</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Warehouse">Warehouse</option>
            <option value="Outdoor">Outdoor</option>
            <option value="Field">Field</option>
          </select>
          <p class="form__error" v-if="!type.isValid">At least one expertise must be selected</p>
        </label>
      </div>
      <button class="form__button button">Save</button>
    </form>
  </div>
  <div class="form__not-found" v-else>Worksite not fount</div>
</template>

<script>
import Spinner from '@/components/Spinner.vue';
import { notify } from "@kyvg/vue3-notification";

export default {
  props: ['id'],
  components: {
    Spinner,
  },
  async created() {
    this.worksite = this.$store.getters.getWorksiteById(this.id);
    if (this.worksite) {
      this.client.value = this.worksite.client;
      this.name.value = this.worksite.name;
      this.address.value = this.worksite.address;
      this.type.value = this.worksite.type;
      this.status.value = this.worksite.status;
    }
    this.isLoading = true;
    await this.loadClients();
    this.isLoading = false;
  },
  data() {
    return {
      isLoading: false,
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
  computed: {
    getClients() {
      return this.$store.getters.clients.filter(client => client.status);
    },
    hasClients() {
      return !this.isLoading && this.$store.getters.hasClients;
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
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      const formData = {
        id: this.id,
        client: this.client.value,
        name: this.name.value,
        address: this.address.value,
        type: this.type.value,
        status: this.status.value,
      };

      this.$store.dispatch('editWorksite', formData);
      notify({type: 'success', title: "The worksite was edited!" });
      this.$router.replace('/worksites/list');
    },
  },
};
</script>
