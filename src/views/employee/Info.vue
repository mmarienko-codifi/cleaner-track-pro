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
          <span class="list__key">Person:</span><span class="list__value">{{ this.employee.person }}</span>
        </div>
      </li>
      <li class="list__item">
        <div class="list__link">
          <span class="list__key">Type:</span><span class="list__value">{{ this.employee.type }}</span>
        </div>
      </li>
      <li class="list__item">
        <div class="list__link">
          <span class="list__key">Status:</span><span class="list__value">{{ this.employee.status ? 'active' : 'inactive' }}</span>
        </div>
      </li>
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
