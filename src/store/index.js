import { createStore } from 'vuex'
import clients from './modules/clients/index';
import employees from './modules/employees';
import equipments from './modules/equipments';
import jobs from './modules/jobs';
import worksites from './modules/worksites'

export default createStore({
  modules: {
    clients,
    auth,
    employees,
    equipments,
    worksites,
    jobs
  },
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
