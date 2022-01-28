export default {
    employees: (state) => {
      return state.employees;
    },
    hasEmployees: (state) => {
      return state.employees && state.employees.length > 0;
    },
    getEmployeeById: (state) => (id) => {
      return state.employees.find((employee) => employee.id === id);
    },
  };
  