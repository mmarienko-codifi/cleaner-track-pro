<template>
  <div class="employee" v-if="this.employee">
    <ul class="employee__list list">
      <li class="list__item">
        <div class="list__link">
          <span class="list__key">Name:</span><span class="list__value">{{ this.employee.name }}</span>
        </div>
      </li>
      <li class="list__item">
        <div class="list__link">
          <span class="list__key">Address:</span><span class="list__value">{{ this.employee.address }}</span>
        </div>
      </li>
      <li class="list__item">
        <div class="list__link">
          <span class="list__key">Phone:</span><span class="list__value">{{ this.employee.phone }}</span>
        </div>
      </li>
      <li class="list__item">
        <div class="list__link">
          <span class="list__key">Monthly salary:</span><span class="list__value">{{ this.employee.salary }}$</span>
        </div>
      </li>
      <li class="list__item">
        <div class="list__link">
          <span class="list__key">Date of birth:</span><span class="list__value">{{ this.employee.date }}</span>
        </div>
      </li>
      <li class="list__item">
        <div class="list__link">
          <span class="list__key">Status:</span><span class="list__value">{{ this.employee.status ? 'active' : 'inactive' }}</span>
        </div>
      </li>
      <router-link :to="'/employees/'+this.id+'/update'" class="form__button button">Edit</router-link>
    </ul>
  </div>
  <div class="form__not-found" v-else>Employee not fount</div>
</template>

<script>
export default {
  props: ['id'],
  created() {
    this.employee = this.$store.getters.getEmployeeById(this.id);
  },
};
</script>
