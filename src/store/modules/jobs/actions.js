export default {
  async addJob(context, data) {
    const newJobID = new Date().getTime().toString();

    const jobData = {
      id: newJobID,
      worksite: data[0].worksite,
      type: data[0].type,
      hazardous: data[0].hazardous,
      employee: data[0].employee,
      service: data[0].service,
      equipment: data[0].equipment,
      start_date: data[0].start_date,
      end_date: data[0].end_date,
    };

    const worksiteData = {
      id: data[1].id,
      client: data[1].client,
      name: data[1].name,
      address: data[1].address,
      type: data[1].type,
      status: data[1].status,
      link: newJobID,
    };

    const employeeData = {
      id: data[2].id,
      name: data[2].name,
      address: data[2].address,
      phone: data[2].phone,
      salary: data[2].salary,
      date: data[2].date,
      status: data[2].status,
      link: newJobID,
    };

    const response = await fetch(`${process.env.VUE_APP_FIREBASE_DATABASE_URL}/jobs/${newJobID}.json`, {
      method: 'PUT',
      body: JSON.stringify(jobData),
    });

    const response2 = await fetch(`${process.env.VUE_APP_FIREBASE_DATABASE_URL}/worksites/${data[1].id}.json`, {
      method: 'PUT',
      body: JSON.stringify(worksiteData),
    });

    const response3 = await fetch(`${process.env.VUE_APP_FIREBASE_DATABASE_URL}/employees/${data[2].id}.json`, {
      method: 'PUT',
      body: JSON.stringify(employeeData),
    });

    const responseData = await response.json();
    const responseData2 = await response2.json();
    const responseData3 = await response3.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to fetch!');
    }
    if (!response2.ok) {
      throw new Error(responseData2.message || 'Failed to fetch!');
    }
    if (!response3.ok) {
      throw new Error(responseData3.message || 'Failed to fetch!');
    }

    data[3].forEach(element => {
      const equipmentData = {
        id: element.id,
        name: element.name,
        storage: element.storage,
        usage: element.usage,
        status: element.status,
        link: newJobID,
      };

      fetch(`${process.env.VUE_APP_FIREBASE_DATABASE_URL}/equipment/${element.id}.json`, {
        method: 'PUT',
        body: JSON.stringify(equipmentData),
      });
    });

    context.commit('createJob', jobData);
  },

  async editJob(context, data) {
    // delete

    const worksiteData2 = {
      id: data[4].id,
      client: data[4].client,
      name: data[4].name,
      address: data[4].address,
      type: data[4].type,
      status: data[4].status,
    };

    const employeeData2 = {
      id: data[5].id,
      name: data[5].name,
      address: data[5].address,
      phone: data[5].phone,
      salary: data[5].salary,
      date: data[5].date,
      status: data[5].status,
    };

    const response4 = await fetch(`${process.env.VUE_APP_FIREBASE_DATABASE_URL}/worksites/${data[4].id}.json`, {
      method: 'PUT',
      body: JSON.stringify(worksiteData2),
    });

    const response5 = await fetch(`${process.env.VUE_APP_FIREBASE_DATABASE_URL}/employees/${data[5].id}.json`, {
      method: 'PUT',
      body: JSON.stringify(employeeData2),
    });

    const responseData4 = await response4.json();
    const responseData5 = await response5.json();

    if (!response4.ok) {
      throw new Error(responseData4.message || 'Failed to fetch!');
    }
    if (!response5.ok) {
      throw new Error(responseData5.message || 'Failed to fetch!');
    }

    data[6].forEach(element => {
      const equipmentData = {
        id: element.id,
        name: element.name,
        storage: element.storage,
        usage: element.usage,
        status: element.status,
      };

      fetch(`${process.env.VUE_APP_FIREBASE_DATABASE_URL}/equipment/${element.id}.json`, {
        method: 'PUT',
        body: JSON.stringify(equipmentData),
      });
    });
    
    const jobData = {
      id: data[0].id,
      worksite: data[0].worksite,
      type: data[0].type,
      hazardous: data[0].hazardous,
      employee: data[0].employee,
      service: data[0].service,
      equipment: data[0].equipment,
      start_date: data[0].start_date,
      end_date: data[0].end_date,
    };

    const worksiteData = {
      id: data[1].id,
      client: data[1].client,
      name: data[1].name,
      address: data[1].address,
      type: data[1].type,
      status: data[1].status,
      link: data[0].id,
    };

    const employeeData = {
      id: data[2].id,
      name: data[2].name,
      address: data[2].address,
      phone: data[2].phone,
      salary: data[2].salary,
      date: data[2].date,
      status: data[2].status,
      link: data[0].id,
    };

    const response = await fetch(`${process.env.VUE_APP_FIREBASE_DATABASE_URL}/jobs/${data[0].id}.json`, {
      method: 'PUT',
      body: JSON.stringify(jobData),
    });

    const response2 = await fetch(`${process.env.VUE_APP_FIREBASE_DATABASE_URL}/worksites/${data[1].id}.json`, {
      method: 'PUT',
      body: JSON.stringify(worksiteData),
    });

    const response3 = await fetch(`${process.env.VUE_APP_FIREBASE_DATABASE_URL}/employees/${data[2].id}.json`, {
      method: 'PUT',
      body: JSON.stringify(employeeData),
    });

    const responseData = await response.json();
    const responseData2 = await response2.json();
    const responseData3 = await response3.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to fetch!');
    }
    if (!response2.ok) {
      throw new Error(responseData2.message || 'Failed to fetch!');
    }
    if (!response3.ok) {
      throw new Error(responseData3.message || 'Failed to fetch!');
    }

    data[3].forEach(element => {
      const equipmentData = {
        id: element.id,
        name: element.name,
        storage: element.storage,
        usage: element.usage,
        status: element.status,
        link: data[1].id,
      };

      fetch(`${process.env.VUE_APP_FIREBASE_DATABASE_URL}/equipment/${element.id}.json`, {
        method: 'PUT',
        body: JSON.stringify(equipmentData),
      });
    });

    

    context.commit('editJob', jobData);
  },

  async loadJobs(context) {
    const response = await fetch(`${process.env.VUE_APP_FIREBASE_DATABASE_URL}/jobs.json`);

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to fetch!');
    }

    const jobs = Object.keys(responseData).reduce((array, key) => {
      array.push({
        id: responseData[key].id,
        worksite: responseData[key].worksite,
        type: responseData[key].type,
        hazardous: responseData[key].hazardous,
        employee: responseData[key].employee,
        service: responseData[key].service,
        equipment: responseData[key].equipment,
        start_date: responseData[key].start_date,
        end_date: responseData[key].end_date,
      });
      return array;
    }, []);

    context.commit('setJobs', jobs);
  },

  async deleteJob(context, data) {
    const jobData = {
      id: data[0].id,
    };

    const worksiteData = {
      id: data[1].id,
      client: data[1].client,
      name: data[1].name,
      address: data[1].address,
      type: data[1].type,
      status: data[1].status,
    };

    const employeeData = {
      id: data[2].id,
      name: data[2].name,
      address: data[2].address,
      phone: data[2].phone,
      salary: data[2].salary,
      date: data[2].date,
      status: data[2].status,
    };

    const response = await fetch(`${process.env.VUE_APP_FIREBASE_DATABASE_URL}/jobs/${data[0].id}.json`, {
      method: 'DELETE',
    });

    const response2 = await fetch(`${process.env.VUE_APP_FIREBASE_DATABASE_URL}/worksites/${data[1].id}.json`, {
      method: 'PUT',
      body: JSON.stringify(worksiteData),
    });

    const response3 = await fetch(`${process.env.VUE_APP_FIREBASE_DATABASE_URL}/employees/${data[2].id}.json`, {
      method: 'PUT',
      body: JSON.stringify(employeeData),
    });

    const responseData = await response.json();
    const responseData2 = await response2.json();
    const responseData3 = await response3.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to fetch!');
    }
    if (!response2.ok) {
      throw new Error(responseData2.message || 'Failed to fetch!');
    }
    if (!response3.ok) {
      throw new Error(responseData3.message || 'Failed to fetch!');
    }

    data[3].forEach(element => {
      const equipmentData = {
        id: element.id,
        name: element.name,
        storage: element.storage,
        usage: element.usage,
        status: element.status,
      };

      fetch(`${process.env.VUE_APP_FIREBASE_DATABASE_URL}/equipment/${element.id}.json`, {
        method: 'PUT',
        body: JSON.stringify(equipmentData),
      });
    });

    context.commit('deleteJob', jobData);
  },
};
