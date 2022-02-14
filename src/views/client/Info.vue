<template>
  <ErrorPopup v-if="error" :message="error" />
  <div v-if="isLoading">
    <Spinner />
  </div>
  <div class="client" v-else-if="this.client">
    <ul class="client__list list">
      <li class="list__item">
        <div class="list__link">
          <span class="list__key">Name:</span><span class="list__value">{{ this.client.name }}</span>
        </div>
      </li>
      <li class="list__item">
        <div class="list__link">
          <span class="list__key">Primary address:</span><span class="list__value">{{ this.client.address }}</span>
        </div>
      </li>
      <li class="list__item">
        <div class="list__link">
          <span class="list__key">Contact phone:</span><span class="list__value">{{ this.client.phone }}</span>
        </div>
      </li>
      <li class="list__item">
        <div class="list__link">
          <span class="list__key">Contact person:</span><span class="list__value">{{ this.client.person }}</span>
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
      <li class="list__item">
        <div class="list__link">
          <span class="list__key">Worksites:</span>
          <span class="list__value" v-if="hasWorksites">{{ getWorksites.join(', ') }}</span>
          <span class="list__value" v-else>none</span>
        </div>
      </li>
    </ul>
  </div>
  <div class="form__not-found" v-else>Client not fount</div>
</template>

<script>
import Spinner from '@/components/Spinner.vue';
import ErrorPopup from '@/components/ErrorPopup.vue';

export default {
  components: {
    Spinner,
    ErrorPopup,
  },
  props: ['id'],
  data() {
    return {
      isLoading: false,
      error: null,
      worksite: {
        value: '',
        isValid: true,
      },
    }
  },
  async created() {
    this.isLoading = true;
    this.client = this.$store.getters.getClientById(this.id);
    await this.loadWorksites();
    this.isLoading = false;
  },
  computed: {
    getWorksites() {
      return this.$store.getters.worksites.filter((worksite) => worksite.client == this.client.name).map(worksite => worksite.name);
    },
    hasWorksites() {
      return !this.isLoading && this.$store.getters.hasWorksites;
    },
  },
  methods: {
    async loadWorksites() {
      try {
        await this.$store.dispatch('loadWorksites');
      } catch (error) {
        if (error.message != 'Cannot convert undefined or null to object') {
          this.error = error.message || 'Something went wrong!';
        }
      }
    },
  }
};
</script>
