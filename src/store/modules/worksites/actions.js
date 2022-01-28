export default {
    async addWorksite(context, data) {
      const newWorksiteID = new Date().getTime().toString();
  
      const worksiteData = {
        id: newWorksiteID,
        name: data.name,
        address: data.address,
        phone: data.phone,
        person: data.person,
        type: data.type,
        status: data.status,
      };
  
      const response = await fetch(`${process.env.VUE_APP_FIREBASE_DATABASE_URL}/worksites/${newWorksiteID}.json`, {
        method: 'PUT',
        body: JSON.stringify(worksiteData),
      });
  
      const responseData = await response.json();
  
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to fetch!');
      }
  
      context.commit('createWorksite', worksiteData);
    },
  
    async editWorksite(context, data) {
      const worksiteData = {
        id: data.id,
        name: data.name,
        address: data.address,
        phone: data.phone,
        person: data.person,
        type: data.type,
        status: data.status,
      };
  
      const response = await fetch(`${process.env.VUE_APP_FIREBASE_DATABASE_URL}/worksites/${data.id}.json`, {
        method: 'PUT',
        body: JSON.stringify(worksiteData),
      });
  
      const responseData = await response.json();
  
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to fetch!');
      }
  
      context.commit('editWorksite', worksiteData);
    },
  
    async loadWorksites(context) {
      const response = await fetch(`${process.env.VUE_APP_FIREBASE_DATABASE_URL}/worksites.json`);
  
      const responseData = await response.json();
  
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to fetch!');
      }
  
      const worksites = Object.keys(responseData).reduce((array, key) => {
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
  
      context.commit('setWorksites', worksites);
    },
  };
  