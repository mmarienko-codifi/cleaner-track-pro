export default {
   clients: (state) => {
      return state.clients;
   },
   hasClients: (state) => {
      return state.clients && state.clients.length > 0;
   },
   getClientById: (state) => (id) => {
      return state.clients.find(client => client.id === id)
   }
};