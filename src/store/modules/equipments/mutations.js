export default {
    createEquipment(state, payload) {
      state.equipments.push(payload);
    },
    editEquipment(state, payload) {
      const index =  state.equipments.findIndex((equipment) => equipment.id === payload.id);
      state.equipments[index] = payload;
    },
    setEquipments(state, payload) {
      state.equipments = payload;
    },
    deleteEquipment(state, payload) {
      const index = state.equipments.findIndex((equipment) => equipment.id === payload.id);
      state.equipments.splice(index, 1);
    },
  };
  