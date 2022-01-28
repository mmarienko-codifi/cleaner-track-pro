export default {
    jobs: (state) => {
      return state.jobs;
    },
    hasJobs: (state) => {
      return state.jobs && state.jobs.length > 0;
    },
    getJobById: (state) => (id) => {
      return state.jobs.find((job) => job.id === id);
    },
  };
  