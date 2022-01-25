<template>
  <div class="client" v-if="this.client">
    <ul class="client__list list">
      <li class="list__item">
        <span class="list__key">Name:</span><span class="list__value">{{ this.client.name }}</span>
      </li>
      <li class="list__item">
        <span class="list__key">Address:</span><span class="list__value">{{ this.client.address }}</span> 
      </li>
      <li class="list__item">
        <span class="list__key">Phone:</span><span class="list__value">{{ this.client.phone }}</span> 
      </li>
      <li class="list__item">
        <span class="list__key">Person:</span><span class="list__value">{{ this.client.person }}</span> 
      </li>
      <li class="list__item">
        <span class="list__key">Type:</span><span class="list__value">{{ this.client.type }}</span> 
      </li>
      <li class="list__item">
        <span class="list__key">Status:</span><span class="list__value">{{ this.client.status ? 'active' : 'inactive'}}</span> 
      </li>
    </ul>
  </div>
  <span class="client__title" v-else>Client not fount</span>
</template>

<script>
export default {
  props: ['id'],
  created() {
    this.client = this.$store.getters.getClientById(this.id);
  }
}
</script>