export default {
  createClient(state, payload) {
    state.clients.push(payload);
  },
  editClient(state, payload) {
    const index =  state.clients.findIndex((client) => client.id === payload.id);
    state.clients[index] = payload;
  },
  setClients(state, payload) {
    state.clients = payload;
  },
};
