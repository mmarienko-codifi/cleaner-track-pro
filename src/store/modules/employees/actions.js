export default {
    async addEmployee(context, data) {
      const newEmployeeID = new Date().getTime().toString();
  
      const employeeData = {
        id: newEmployeeID,
        name: data.name,
        address: data.address,
        phone: data.phone,
        person: data.person,
        type: data.type,
        status: data.status,
      };
  
      const response = await fetch(`${process.env.VUE_APP_FIREBASE_DATABASE_URL}/employees/${newEmployeeID}.json`, {
        method: 'PUT',
        body: JSON.stringify(employeeData),
      });
  
      const responseData = await response.json();
  
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to fetch!');
      }
  
      context.commit('createEmployee', employeeData);
    },
  
    async editEmployee(context, data) {
      const employeeData = {
        id: data.id,
        name: data.name,
        address: data.address,
        phone: data.phone,
        person: data.person,
        type: data.type,
        status: data.status,
      };
  
      const response = await fetch(`${process.env.VUE_APP_FIREBASE_DATABASE_URL}/employees/${data.id}.json`, {
        method: 'PUT',
        body: JSON.stringify(employeeData),
      });
  
      const responseData = await response.json();
  
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to fetch!');
      }
  
      context.commit('editEmployee', employeeData);
    },
  
    async loadEmployees(context) {
      const response = await fetch(`${process.env.VUE_APP_FIREBASE_DATABASE_URL}/employees.json`);
  
      const responseData = await response.json();
  
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to fetch!');
      }
  
      const employees = Object.keys(responseData).reduce((array, key) => {
        array.push({
          id: responseData[key].id,
          name: responseData[key].name,
          address: responseData[key].address,
          phone: responseData[key].phone,
          person: responseData[key].person,
          type: responseData[key].type,
          status: responseData[key].status,
        });
        return array;
      }, []);
  
      context.commit('setEmployees', employees);
    },
  };
  