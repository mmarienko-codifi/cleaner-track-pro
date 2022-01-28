<template>
  <ErrorPopup v-if="error" :message="error" />
  <div class="worksites" v-else>
    <div v-if="isLoading">
      <Spinner />
    </div>
    <ul class="worksites__list list" v-else-if="hasWorksites">
      <li class="list__item" :class="worksite.status ? '' : 'list__item--deactivated'" v-for="worksite in getWorksites" :key="worksite.id">
        <router-link class="list__link" :to="'/worksites/' + worksite.id + '/read'">
          <span class="list__title"> {{ worksite.name }} ({{ worksite.person }}) </span>
          <router-link class="list__button button" :to="'/worksites/' + worksite.id + '/read'"> Read </router-link>
          <router-link class="list__button button button--edit" :to="'/worksites/' + worksite.id + '/update'"> Update </router-link>
          <router-link class="list__button button button--delete" :to="'/worksites/' + worksite.id + '/delete'"> Delete </router-link>
        </router-link>
        <span class="list__deactivated" v-if="!worksite.status"> deactivated </span>
      </li>
    </ul>
    <div class="list__not-found" v-else>No worksites found</div>
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
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
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
