export default {
  async addClient(context, data) {
    const newClientID = new Date().getTime().toString();

    const clientData = {
      id: newClientID,
      name: data.name,
      address: data.address,
      phone: data.phone,
      person: data.person,
      type: data.type,
      status: data.status,
    };

    const response = await fetch(`${process.env.VUE_APP_FIREBASE_DATABASE_URL}/clients/${newClientID}.json`, {
      method: 'PUT',
      body: JSON.stringify(clientData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to fetch!');
    }

    context.commit('createClient', clientData);
  },

  async editClient(context, data) {
    const clientData = {
      id: data.id,
      name: data.name,
      address: data.address,
      phone: data.phone,
      person: data.person,
      type: data.type,
      status: data.status,
    };

    const response = await fetch(`${process.env.VUE_APP_FIREBASE_DATABASE_URL}/clients/${data.id}.json`, {
      method: 'PUT',
      body: JSON.stringify(clientData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to fetch!');
    }

    context.commit('editClient', clientData);
  },

  async loadClients(context) {
    const response = await fetch(`${process.env.VUE_APP_FIREBASE_DATABASE_URL}/clients.json`);

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to fetch!');
    }

    const clients = Object.keys(responseData).reduce((array, key) => {
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

    context.commit('setClients', clients);
  },

  async deleteClient(context, data) {
    const clientData = {
      id: data.id,
    };

    const response = await fetch(`${process.env.VUE_APP_FIREBASE_DATABASE_URL}/clients/${data.id}.json`, {
      method: 'DELETE',
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to fetch!');
    }

    context.commit('deleteClient', clientData);
  },
};
