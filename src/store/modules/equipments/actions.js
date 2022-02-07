export default {
    async addEquipment(context, data) {
      const newEquipmentID = new Date().getTime().toString();
  
      const equipmentData = {
        id: newEquipmentID,
        name: data.name,
        storage: data.storage,
        usage: data.usage,
        status: data.status,
      };
  
      const response = await fetch(`${process.env.VUE_APP_FIREBASE_DATABASE_URL}/equipment/${newEquipmentID}.json`, {
        method: 'PUT',
        body: JSON.stringify(equipmentData),
      });
  
      const responseData = await response.json();
  
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to fetch!');
      }
  
      context.commit('createEquipment', equipmentData);
    },
  
    async editEquipment(context, data) {
      const equipmentData = {
        id: data.id,
        name: data.name,
        storage: data.storage,
        usage: data.usage,
        status: data.status,
        link: data.link,
      };
  
      const response = await fetch(`${process.env.VUE_APP_FIREBASE_DATABASE_URL}/equipment/${data.id}.json`, {
        method: 'PUT',
        body: JSON.stringify(equipmentData),
      });
  
      const responseData = await response.json();
  
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to fetch!');
      }
  
      context.commit('editEquipment', equipmentData);
    },
  
    async loadEquipments(context) {
      const response = await fetch(`${process.env.VUE_APP_FIREBASE_DATABASE_URL}/equipment.json`);
  
      const responseData = await response.json();
  
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to fetch!');
      }
  
      const equipments = Object.keys(responseData).reduce((array, key) => {
        array.push({
          id: responseData[key].id,
          name: responseData[key].name,
          storage: responseData[key].storage,
          usage: responseData[key].usage,
          status: responseData[key].status,
          link: responseData[key].link,
        });
        return array;
      }, []);
  
      context.commit('setEquipments', equipments);
    },
        
    async deleteEquipment(context, data) {
      const equipmentData = {
        id: data.id,
      };
  
      const response = await fetch(`${process.env.VUE_APP_FIREBASE_DATABASE_URL}/equipment/${data.id}.json`, {
        method: 'DELETE',
      });
  
      const responseData = await response.json();
  
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to fetch!');
      }
  
      context.commit('deleteEquipment', equipmentData);
    },
  };
  