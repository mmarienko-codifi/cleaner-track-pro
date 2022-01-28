<template>
  <div class="equipment" v-if="this.equipment">
    <ul class="equipment__list list">
      <li class="list__item">
        <div class="list__link">
          <span class="list__key">Name:</span><span class="list__value">{{ this.equipment.name }}</span>
        </div>
      </li>
      <li class="list__item">
        <div class="list__link">
          <span class="list__key">Address:</span><span class="list__value">{{ this.equipment.address }}</span>
        </div>
      </li>
      <li class="list__item">
        <div class="list__link">
          <span class="list__key">Phone:</span><span class="list__value">{{ this.equipment.phone }}</span>
        </div>
      </li>
      <li class="list__item">
        <div class="list__link">
          <span class="list__key">Person:</span><span class="list__value">{{ this.equipment.person }}</span>
        </div>
      </li>
      <li class="list__item">
        <div class="list__link">
          <span class="list__key">Type:</span><span class="list__value">{{ this.equipment.type }}</span>
        </div>
      </li>
      <li class="list__item">
        <div class="list__link">
          <span class="list__key">Status:</span><span class="list__value">{{ this.equipment.status ? 'active' : 'inactive' }}</span>
        </div>
      </li>
    </ul>
  </div>
  <div class="form__not-found" v-else>Equipment not fount</div>
</template>

<script>
export default {
  props: ['id'],
  created() {
    this.equipment = this.$store.getters.getEquipmentById(this.id);
  },
};
</script>
