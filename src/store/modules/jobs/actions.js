export default {
    async addJob(context, data) {
      const newJobID = new Date().getTime().toString();
  
      const jobData = {
        id: newJobID,
        name: data.name,
        address: data.address,
        phone: data.phone,
        person: data.person,
        type: data.type,
        status: data.status,
      };
  
      const response = await fetch(`${process.env.VUE_APP_FIREBASE_DATABASE_URL}/jobs/${newJobID}.json`, {
        method: 'PUT',
        body: JSON.stringify(jobData),
      });
  
      const responseData = await response.json();
  
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to fetch!');
      }
  
      context.commit('createJob', jobData);
    },
  
    async editJob(context, data) {
      const jobData = {
        id: data.id,
        name: data.name,
        address: data.address,
        phone: data.phone,
        person: data.person,
        type: data.type,
        status: data.status,
      };
  
      const response = await fetch(`${process.env.VUE_APP_FIREBASE_DATABASE_URL}/jobs/${data.id}.json`, {
        method: 'PUT',
        body: JSON.stringify(jobData),
      });
  
      const responseData = await response.json();
  
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to fetch!');
      }
  
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
          name: responseData[key].name,
          address: responseData[key].address,
          phone: responseData[key].phone,
          person: responseData[key].person,
          type: responseData[key].type,
          status: responseData[key].status,
        });
        return array;
      }, []);
  
      context.commit('setJobs', jobs);
    },
  };
  