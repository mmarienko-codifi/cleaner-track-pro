<template>
  <div class="job" v-if="this.job">
    <ul class="job__list list">
      <li class="list__item">
        <div class="list__link">
          <span class="list__key">Worksite:</span><span class="list__value">{{ this.$store.getters.getWorksiteById(this.job.worksite).name }}</span>
        </div>
      </li>
      <li class="list__item">
        <div class="list__link">
          <span class="list__key">Type:</span><span class="list__value">{{ this.job.type }}</span>
        </div>
      </li>
      <li class="list__item">
        <div class="list__link">
          <span class="list__key">Hazardous materials:</span><span class="list__value">{{ this.job.hazardous ? 'YES' : 'NO' }}</span>
        </div>
      </li>
      <li class="list__item">
        <div class="list__link">
          <span class="list__key">Employee:</span><span class="list__value">{{ this.$store.getters.getEmployeeById(this.job.employee).name }}</span>
        </div>
      </li>
      <li class="list__item">
        <div class="list__link">
          <span class="list__key">Service fee:</span><span class="list__value">{{ this.job.service }}$</span>
        </div>
      </li>
      <li class="list__item">
        <div class="list__link">
          <span class="list__key">Additional equipment:</span>
          <span class="list__value" v-if="Array.isArray(this.job.equipment)">{{ this.job.equipment.join(', ') }}</span>
          <span class="list__value" v-else-if="this.job.equipment">{{ this.job.equipment }}</span>
          <span class="list__value" v-else>none</span>
        </div>
      </li>
      <li class="list__item">
        <div class="list__link">
          <span class="list__key">Start date:</span><span class="list__value">{{ this.job.start_date }}</span>
        </div>
      </li>
      <li class="list__item">
        <div class="list__link">
          <span class="list__key">End date:</span><span class="list__value">{{ this.job.end_date }}</span>
        </div>
      </li>
      <li class="list__item">
        <div class="list__link">
          <span class="list__key">Status:</span><span class="list__value">{{ this.job.status ? 'active' : 'inactive' }}</span>
        </div>
      </li>
    </ul>
  </div>
  <div class="form__not-found" v-else>Job not fount</div>
</template>

<script>
export default {
  props: ['id'],
  created() {
    this.job = this.$store.getters.getJobById(this.id);
  },
};
</script>
