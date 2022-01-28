export default {
    async addEquipment(context, data) {
      const newEquipmentID = new Date().getTime().toString();
  
      const equipmentData = {
        id: newEquipmentID,
        name: data.name,
        address: data.address,
        phone: data.phone,
        person: data.person,
        type: data.type,
        status: data.status,
      };
  
      const response = await fetch(`${process.env.VUE_APP_FIREBASE_DATABASE_URL}/equipments/${newEquipmentID}.json`, {
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
        address: data.address,
        phone: data.phone,
        person: data.person,
        type: data.type,
        status: data.status,
      };
  
      const response = await fetch(`${process.env.VUE_APP_FIREBASE_DATABASE_URL}/equipments/${data.id}.json`, {
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
      const response = await fetch(`${process.env.VUE_APP_FIREBASE_DATABASE_URL}/equipments.json`);
  
      const responseData = await response.json();
  
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to fetch!');
      }
  
      const equipments = Object.keys(responseData).reduce((array, key) => {
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
  
      context.commit('setEquipments', equipments);
    },
  };
  