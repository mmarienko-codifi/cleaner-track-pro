<template>
  <div class="worksite" v-if="this.worksite">
    <form class="worksite__form form" @submit.prevent="submitForm">
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
      <button class="form__button button">Edit</button>
    </form>
  </div>
  <div class="form__not-found" v-else>Worksite not fount</div>
  <div class="form__not-found form__error" v-if="!link.isValid">The worksite is busy. You can't change the status</div>
</template>

<script>
export default {
  props: ['id'],
  created() {
    this.worksite = this.$store.getters.getWorksiteById(this.id);
    if (this.worksite) {
      this.name.value = this.worksite.name;
      this.address.value = this.worksite.address;
      this.type.value = this.worksite.type;
      this.status.value = this.worksite.status;
      this.link.value = this.worksite.link;
    }
  },
  data() {
    return {
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
      link: {
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
    validateLink() {
      if (!this.link.value) {
        this.link.isValid = true;
        return true;
      } else {
        this.link.isValid = false;
        return false;
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
      if (!this.validateType()) {
        this.formIsValid = false;
      }
      if (!this.validateStatus()) {
        this.formIsValid = false;
      }
      if (!this.validateLink()) {
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
        name: this.name.value,
        address: this.address.value,
        type: this.type.value,
        status: this.status.value,
        link: this.status.link,
      };

      this.$store.dispatch('editWorksite', formData);
      this.$router.replace('/worksites/list');
    },
  },
};
</script>
