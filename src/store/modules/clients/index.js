import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  state: {
    clients: [
      {
        id: 'c1',
        name: 'Elese',
        address: 'st. Rymarska',
        phone: '+1333998664',
        person: 'Maxim Maximovish',
        type: 'company',
        status: true,
      },
      {
        id: 'c2',
        name: 'Adidas',
        address: 'st. Rymarska',
        phone: '+1333998664',
        person: 'Oleg Olegovich',
        type: 'company',
        status: true,
      },
      {
        id: 'c3',
        name: 'Nike',
        address: 'st. Rymarska',
        phone: '+1333998664',
        person: 'Valentin Valentinovich',
        type: 'company',
        status: false,
      },
    ],
  },
  actions,
  getters,
  mutations,
};
