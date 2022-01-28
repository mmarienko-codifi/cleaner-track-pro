<template>
  <div class="worksite" v-if="this.worksite">
    <ul class="worksite__list list">
      <li class="list__item">
        <div class="list__link">
          <span class="list__key">Name:</span><span class="list__value">{{ this.worksite.name }}</span>
        </div>
      </li>
      <li class="list__item">
        <div class="list__link">
          <span class="list__key">Address:</span><span class="list__value">{{ this.worksite.address }}</span>
        </div>
      </li>
      <li class="list__item">
        <div class="list__link">
          <span class="list__key">Phone:</span><span class="list__value">{{ this.worksite.phone }}</span>
        </div>
      </li>
      <li class="list__item">
        <div class="list__link">
          <span class="list__key">Person:</span><span class="list__value">{{ this.worksite.person }}</span>
        </div>
      </li>
      <li class="list__item">
        <div class="list__link">
          <span class="list__key">Type:</span><span class="list__value">{{ this.worksite.type }}</span>
        </div>
      </li>
      <li class="list__item">
        <div class="list__link">
          <span class="list__key">Status:</span><span class="list__value">{{ this.worksite.status ? 'active' : 'inactive' }}</span>
        </div>
      </li>
    </ul>
  </div>
  <div class="form__not-found" v-else>Worksite not fount</div>
</template>

<script>
export default {
  props: ['id'],
  created() {
    this.worksite = this.$store.getters.getWorksiteById(this.id);
  },
};
</script>
