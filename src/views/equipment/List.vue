<template>
  <ErrorPopup v-if="error" :message="error" />
  <div class="equipments" v-else>
    <div v-if="isLoading">
      <Spinner />
    </div>
    <ul class="equipments__list list" v-else-if="hasEquipments">
      <li class="list__item" :class="{'list__item--busy': equipment.link, 'list__item--deactivated': !equipment.status}" v-for="equipment in getEquipments" :key="equipment.id">
        <router-link class="list__link" :to="'/equipment/' + equipment.id + '/read'">
          <span class="list__title"> {{ equipment.name }} | {{ equipment.usage }}$ | {{ equipment.storage }} </span>
          <router-link class="list__button button" :to="'/equipment/' + equipment.id + '/read'"> Read </router-link>
          <router-link class="list__button button button--edit" :to="'/equipment/' + equipment.id + '/update'"> Update </router-link>
          <a class="list__button button button--delete" @click.prevent="deleteEquipment(equipment)"> Delete </a>
        </router-link>
        <span class="list__busy" v-if="equipment.link"> busy </span>
        <span class="list__deactivated" v-else-if="!equipment.status"> deactivated </span>
      </li>
    </ul>
    <div class="list__not-found" v-else>No equipments found</div>
    <router-link class="equipments__button button" :to="'/equipment/create'" v-if="!isLoading"> New equipment </router-link>
  </div>
</template>

<script>
import Spinner from '@/components/Spinner.vue';
import ErrorPopup from '@/components/ErrorPopup.vue';

export default {
  components: {
    Spinner,
    ErrorPopup,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  created() {
    this.loadEquipments();
  },
  computed: {
    getEquipments() {
      return this.$store.getters.equipments;
    },
    hasEquipments() {
      return !this.isLoading && this.$store.getters.hasEquipments;
    },
  },
  methods: {
    async loadEquipments() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('loadEquipments');
      } catch (error) {
        if (error.message != 'Cannot convert undefined or null to object') {
          this.error = error.message || 'Something went wrong!';
        }
      }
      this.isLoading = false;
    },
    async deleteEquipment(data) {
      this.isLoading = true;

      const formData = {
        id: data.id,
      };

      try {
        await this.$store.dispatch('deleteEquipment', formData);
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
      this.$router.replace('/equipment/list');
    },
  },
};
</script>

<style lang="scss" scoped>
.equipments {
  &__button {
    padding: 7px 10px;
    width: 100%;

    border-radius: 0 0 var(--border-radius) var(--border-radius);
  }
}
</style>
