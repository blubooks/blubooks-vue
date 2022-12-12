import api from './api';

class ClientService {
 
  getClients() {
    return api.get('/page/clients');
  }
  getClient(id) {
    return api.get('/page/client/' + id);
  }
  getCollection(id) {
    return api.get('/page/collection/' + id);
  }
  getPageSection(id) {
    return api.get('/page/section/' + id);
  }  
  getSection(id) {
    return api.get('/section/' + id);
  }    
  putSection(id, params) {
    return api.put('/section/' + id, params);
  }      
  getBook(id) {
    return api.get('/page/book/' + id);
  }  
  getClientCollections(id) {
    return api.get('/client/' + id + '/collections');
  }

  getUserBoard() {
    return api.get('/test/user');
  }

  getModeratorBoard() {
    return api.get('/test/mod');
  }

  getAdminBoard() {
    return api.get('/test/admin');
  }
}

export default new ClientService();