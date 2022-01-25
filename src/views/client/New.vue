<template>
  <div class="client">
    <form class="client__form form" @submit.prevent="submitForm">
      <div class="form__field">
        <label class="form__label">
          <span class="form__span">Name</span>
          <input class="form__input" name="name" type="text" v-model.trim="name">
        </label>
      </div>
      <div class="form__field">
        <label class="form__label">
          <span class="form__span">Address</span>
          <input class="form__input" name="address" type="text" v-model.trim="address">
        </label>
      </div>
      <div class="form__field">
        <label class="form__label">
          <span class="form__span">Phone</span>
          <input class="form__input" name="phone" type="text" v-model.trim="phone">
        </label>
      </div>
      <div class="form__field">
        <label class="form__label">
          <span class="form__span">Person</span>
          <input class="form__input" name="person" type="text" v-model.trim="person">
        </label>
      </div>
      <div class="form__field">
        <label class="form__label">
          <span class="form__span">Type</span>
          <div class="form__radio">
            <div class="form__radio-item">
              <label class="form__radio-label">
                <input class="form__radio-input" name="type" type="radio" value="company" checked v-model="type">
                <span class="form__radio-span">Company</span>
              </label>
            </div>
            <div class="form__radio-item">
              <label class="form__radio-label">
                <input class="form__radio-input" name="type" type="radio" value="personal" v-model="type">
                <span class="form__radio-span">Personal</span>
              </label>
            </div>
          </div>
        </label>
      </div>
      <div class="form__field">
        <label class="form__label">
          <span class="form__span">Active</span>
          <div class="form__checkbox">
            <input class="form__checkbox-input" name="status" type="checkbox" v-model="status" checked>
            <span class="form__checkbox-span"></span>
          </div>
        </label>
      </div>
      <button class="form__button button">Create</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      address: '',
      phone: '',
      person: '',
      type: 'company',
      status: true,
      formIsValid: true,
    }
  },
  methods: {
    validateForm() {

    },
    submitForm() {
      this.validateForm();

      const formData = {
        name: this.name,  
        address: this.address,  
        phone: this.phone,  
        person: this.person,  
        type: this.type,  
        status: this.status
      }

      this.$store.dispatch('addClient', formData); 
      this.$router.replace('/clients/list');
    }
  }
}
</script>