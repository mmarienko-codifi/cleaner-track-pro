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
          <span class="list__key">Storage location:</span><span class="list__value">{{ this.equipment.storage }}</span>
        </div>
      </li>
      <li class="list__item">
        <div class="list__link">
          <span class="list__key">Usage fee:</span><span class="list__value">{{ this.equipment.usage }}$</span>
        </div>
      </li>
      <li class="list__item">
        <div class="list__link">
          <span class="list__key">Status:</span><span class="list__value">{{ this.equipment.status ? 'active' : 'inactive' }}</span>
        </div>
      </li>
      <router-link :to="'/equipment/'+this.id+'/update'" class="form__button button">Edit</router-link>
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
