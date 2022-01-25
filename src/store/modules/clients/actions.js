export default {
   addClient(context, data) {
      const clientData = {
         id: (new Date()).getTime().toString(),
         name: data.name,  
         address: data.address,  
         phone: data.phone,  
         person: data.person,  
         type: data.type,  
         status: data.status
      }

      context.commit('createClient', clientData);
   }
};