export default {
    createEmployee(state, payload) {
      state.employees.push(payload);
    },
    editEmployee(state, payload) {
      const index =  state.employees.findIndex((employee) => employee.id === payload.id);
      state.employees[index] = payload;
    },
    setEmployees(state, payload) {
      state.employees = payload;
    },
    deleteEmployee(state, payload) {
      const index = state.employees.findIndex((employee) => employee.id === payload.id);
      state.employees.splice(index, 1);
    },
  };
  