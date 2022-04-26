export default {
    equipments: (state) => {
      return state.equipments;
    },
    hasEquipments: (state) => {
      return state.equipments && state.equipments.length > 0;
    },
    getEquipmentById: (state) => (id) => {
      return state.equipments.find((equipment) => equipment.id === id);
    },
  };
  