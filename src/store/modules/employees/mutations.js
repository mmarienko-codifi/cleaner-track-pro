export default {
    createEmployee(state, payload) {
      state.employees.push(payload);
    },
    editEmployees(state, payload) {
      const index =  state.employees.findIndex((employee) => employee.id === payload.id);
      state.employees[index] = payload;
    },
    setEmployees(state, payload) {
      state.employees = payload;
    },
  };
  