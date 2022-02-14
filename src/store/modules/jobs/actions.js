export default {
  async addJob(context, data) {
    const jobData = {
      id: data.id,
      worksite: data.worksite,
      type: data.type,
      hazardous: data.hazardous,
      employee: data.employee,
      service: data.service,
      equipment: data.equipment,
      start_date: data.start_date,
      end_date: data.end_date,
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

    context.commit('createJob', jobData);
  },

  async editJob(context, data) {
    const jobData = {
      id: data.id,
      worksite: data.worksite,
      type: data.type,
      hazardous: data.hazardous,
      employee: data.employee,
      service: data.service,
      equipment: data.equipment,
      start_date: data.start_date,
      end_date: data.end_date,
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
        worksite: responseData[key].worksite,
        type: responseData[key].type,
        hazardous: responseData[key].hazardous,
        employee: responseData[key].employee,
        service: responseData[key].service,
        equipment: responseData[key].equipment,
        start_date: responseData[key].start_date,
        end_date: responseData[key].end_date,
        status: responseData[key].status,
      });
      return array;
    }, []);

    context.commit('setJobs', jobs);
  },
};
