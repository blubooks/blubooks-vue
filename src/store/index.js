import { createStore } from "vuex";
import { auth } from "./auth.module";
import ClientService from "@/services/client.service";

const state = {
  clients: [],
  currentClient: {},
  currentNavi: [],
  currentSection: {},
  currentBook: {},
};
const getters = {  
  clients(state) {
    return state.clients;
  },
  currentClient(state) {
    return state.currentClient;
  },  
  currentNavi(state) {
    return state.currentNavi;
  },
  currentSection(state) {
    return state.currentSection;
  },
  currentBook(state) {
    return state.currentBook;
  },
}
const actions = {
  client({ commit }, clientID) {
    return ClientService.getClient(clientID).then(
      (response) => {
        commit('setclient', response.data);
        return Promise.resolve(response.data);        
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  },
  clientList({ commit }) {
    return ClientService.getClients().then(
      (response) => {
        commit('setClients', response.data.content.clients);
        return Promise.resolve(response.data.content.clients);        
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }  
}

const mutations = {
  setClients(state, clients) {
    state.clients = clients
  }
}

const store = createStore({
  state,
  getters,
  actions,
  mutations,
  modules: {
    auth,
  },
});

export default store;