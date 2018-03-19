import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import newPage from './new-vuex'
import {getters} from './getters'

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    user,
    newPage
  },
  getters
});
