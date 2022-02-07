<template>
  <ErrorPopup v-if="error" :message="error" />
  <div class="worksites" v-else>
    <div v-if="isLoading">
      <Spinner />
    </div>
    <ul class="worksites__list list" v-else-if="hasWorksites">
      <li class="list__item" :class="{'list__item--busy': worksite.link, 'list__item--deactivated': !worksite.status}" v-for="worksite in getWorksites" :key="worksite.id">
        <router-link class="list__link" :to="'/worksites/' + worksite.id + '/read'">
          <span class="list__title"> {{ worksite.name }} ({{ worksite.address }}) </span>
          <router-link class="list__button button" :to="'/worksites/' + worksite.id + '/read'"> Read </router-link>
          <router-link class="list__button button button--edit" :to="'/worksites/' + worksite.id + '/update'"> Update </router-link>
          <a class="list__button button button--delete" @click.prevent="deleteWorksite(worksite)"> Delete </a>
        </router-link>
        <span class="list__busy" v-if="worksite.link"> busy </span>
        <span class="list__deactivated" v-else-if="!worksite.status"> deactivated </span>
      </li>
    </ul>
    <div class="list__not-found" v-else>No worksites found</div>
    <div class="list__not-found form__error" v-if="!busy.isValid">The worksite is busy. You cannot delete it.</div>
    <router-link class="worksites__button button" :to="'/worksites/create'" v-if="!isLoading"> New worksite </router-link>
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
      busy: {
        isValid: true,
      }
    };
  },
  created() {
    this.loadWorksites();
  },
  computed: {
    getWorksites() {
      return this.$store.getters.worksites;
    },
    hasWorksites() {
      return !this.isLoading && this.$store.getters.hasWorksites;
    },
  },
  methods: {
    async loadWorksites() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('loadWorksites');
      } catch (error) {
        if (error.message != 'Cannot convert undefined or null to object') {
          this.error = error.message || 'Something went wrong!';
        }
      }
      this.isLoading = false;
    },
    async deleteWorksite(data) {
      this.isLoading = true;

      if (data.link) {
        this.busy.isValid = false;
        this.isLoading = false;
        return;
      } else {
        this.busy.isValid = true;
      }

      const formData = {
        id: data.id,
      };

      try {
        await this.$store.dispatch('deleteWorksite', formData);
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
      this.$router.replace('/worksites/list');
    },
  },
};
</script>

<style lang="scss" scoped>
.worksites {
  &__button {
    padding: 7px 10px;
    width: 100%;

    border-radius: 0 0 var(--border-radius) var(--border-radius);
  }
}
</style>
