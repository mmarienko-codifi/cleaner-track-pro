export default {
    createWorksite(state, payload) {
      state.worksites.push(payload);
    },
    updateWorksiteLink(state, payload) {
      const index = state.worksites.findIndex((worksite) => worksite.id === payload);
      state.worksites[index].link = payload;
    },
    editWorksite(state, payload) {
      const index = state.worksites.findIndex((worksite) => worksite.id === payload.id);
      state.worksites[index] = payload;
    },
    setWorksites(state, payload) {
      state.worksites = payload;
    },
    deleteWorksite(state, payload) {
      const index = state.worksites.findIndex((worksite) => worksite.id === payload.id);
      state.worksites.splice(index, 1);
    },
  };
  