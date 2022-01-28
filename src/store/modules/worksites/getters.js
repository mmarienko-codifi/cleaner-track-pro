export default {
    worksites: (state) => {
      return state.worksites;
    },
    hasWorksites: (state) => {
      return state.worksites && state.worksites.length > 0;
    },
    getWorksiteById: (state) => (id) => {
      return state.worksites.find((worksite) => worksite.id === id);
    },
  };
  