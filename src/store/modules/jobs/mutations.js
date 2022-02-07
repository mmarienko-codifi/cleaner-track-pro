export default {
  createJob(state, payload) {
    state.jobs.push(payload);
  },
  editJob(state, payload) {
    const index = state.jobs.findIndex((job) => job.id === payload.id);
    state.jobs[index] = payload;
  },
  setJobs(state, payload) {
    state.jobs = payload;
  },
  deleteJob(state, payload) {
    const index = state.jobs.findIndex((job) => job.id === payload.id);
    state.jobs.splice(index, 1);
  },
};
