<template>
  <div class="client" v-if="this.client">
    <ul class="client__list list">
      <li class="list__item">
        <div class="list__link">
          <span class="list__key">Name:</span><span class="list__value">{{ this.client.name }}</span>
        </div>
      </li>
      <li class="list__item">
        <div class="list__link">
          <span class="list__key">Address:</span><span class="list__value">{{ this.client.address }}</span>
        </div>
      </li>
      <li class="list__item">
        <div class="list__link">
          <span class="list__key">Phone:</span><span class="list__value">{{ this.client.phone }}</span>
        </div>
      </li>
      <li class="list__item">
        <div class="list__link">
          <span class="list__key">Person:</span><span class="list__value">{{ this.client.person }}</span>
        </div>
      </li>
      <li class="list__item">
        <div class="list__link">
          <span class="list__key">Type:</span><span class="list__value">{{ this.client.type }}</span>
        </div>
      </li>
      <li class="list__item">
        <div class="list__link">
          <span class="list__key">Status:</span><span class="list__value">{{ this.client.status ? 'active' : 'inactive' }}</span>
        </div>
      </li>
    </ul>
  </div>
  <div class="form__not-found" v-else>Client not fount</div>
</template>

<script>
export default {
  props: ['id'],
  created() {
    this.client = this.$store.getters.getClientById(this.id);
  },
};
</script>
