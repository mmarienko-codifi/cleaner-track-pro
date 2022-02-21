<template>
  <ErrorPopup v-if="error" :message="error" />
  <div class="equipments" v-else>
    <div v-if="isLoading">
      <Spinner />
    </div>
    <ul class="equipments__list list" v-else-if="hasEquipments">
      <li class="list__item" :class="{'list__item--busy': this.$store.getters.hasJobs && getActiveJob(equipment), 'list__item--deactivated': !equipment.status}" v-for="equipment in getEquipments" :key="equipment.id">
        <router-link class="list__link" :to="'/equipment/' + equipment.id + '/read'">
          <span class="list__title"> {{ equipment.name }} ({{ equipment.usage }}$)</span>
          <router-link class="list__button button" :to="'/equipment/' + equipment.id + '/read'"> Details </router-link>
          <router-link class="list__button button button--edit" :to="'/equipment/' + equipment.id + '/update'"> Edit </router-link>
          <a class="list__button button button--delete" v-if="equipment.status == true" @click.prevent="deleteEquipment(equipment)"> Deactivate </a>
          <a class="list__button button button--activate" v-else @click.prevent="activateEquipment(equipment)"> Activate </a>
        </router-link>
        <span class="list__deactivated" v-if="!equipment.status"> deactivated </span>
      </li>
    </ul>
    <div class="list__not-found" v-else>No equipments found</div>
    <router-link class="equipments__button button" :to="'/equipment/create'" v-if="!isLoading"> Create equipment </router-link>
  </div>
</template>

<script>
import Spinner from '@/components/Spinner.vue';
import ErrorPopup from '@/components/ErrorPopup.vue';
import { notify } from "@kyvg/vue3-notification";

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
  async created() {
    this.isLoading = true;
    await this.loadJobs();
    await this.loadEquipments();
    this.isLoading = false;
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
    getActiveJob(equipment) {
      return this.$store.getters.jobs.find((job) => {
        return job.equipment.find(jobEquipment => jobEquipment == equipment.id && job.status);
      });
    },
    async loadEquipments() {
      try {
        await this.$store.dispatch('loadEquipments');
      } catch (error) {
        if (error.message != 'Cannot convert undefined or null to object') {
          if (error.message != 'Cannot convert undefined or null to object') {
          this.error = error.message || 'Something went wrong!';
        }
        }
      }
    },
    async loadJobs() {
      try {
        await this.$store.dispatch('loadJobs');
      } catch (error) {
        if (error.message != 'Cannot convert undefined or null to object') {
          if (error.message != 'Cannot convert undefined or null to object') {
          this.error = error.message || 'Something went wrong!';
        }
        }
      }
    },
    async deleteEquipment(data) {
      this.isLoading = true;

      if (this.$store.getters.hasJobs && this.getActiveJob(data)) {
        notify({type: 'error', title: "The equipment has active jobs" });
        this.isLoading = false;
        return;
      }

      const formData = this.$store.getters.getEquipmentById(data.id);

      formData.status = false;

      try {
        await this.$store.dispatch('editEquipment', formData);
      } catch (error) {
        if (error.message != 'Cannot convert undefined or null to object') {
          this.error = error.message || 'Something went wrong!';
        }
      }
      this.isLoading = false;
      this.$router.replace('/equipment/list');
    },
    async activateEquipment(data) {
      this.isLoading = true;

      const formData = this.$store.getters.getEquipmentById(data.id);
      
      formData.status = true;

      try {
        await this.$store.dispatch('editEquipment', formData);
      } catch (error) {
        if (error.message != 'Cannot convert undefined or null to object') {
          this.error = error.message || 'Something went wrong!';
        }
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
