import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: null,
    access: {
      address: 'nQieyKbf9EDZEi_SZLr1UsvhT9rND4CwSOJANxqb6Lo.PoECxQ816w_SzXxeyVBZ0XC0QNu9KvUvn5jAjxVMgGM',
      certs: {
        posts: 'SEA{"m":{"c":"*","e":1647742288681,"w":{"*":"posts","+":"*"}},"s":"bpfckdYbLX8wPOdfEYgSG43u1/5oOKUl5tGekNGshvXytlrfir27/oKJrGDAxjdCl3DRXkgdnZS2lOX/RctYSg=="}',
        profiles: 'SEA{"m":{"c":"*","e":1647746210329,"w":{"*":"profiles","+":"*"}},"s":"QfBHEhgcLCnfSr21miWBS64/kOYfI/1ObqJKYYOy6bhu8094IDCmTuWV9sPo6lDWb0jAGA5X2PPHQk8hqS34zA=="}'
      }
    }
  },
  getters: {
    status(state){
      return state.status
    },
    auth(state){
      return state.status ? true : false
    }
  },
  mutations: {
    auth(state, data){
      state.status = data
    },
    deauth(state){
      state.status = null
    }
  },
  actions: {
    auth(context, data){
      context.commit('auth', data)
    },
    deauth(context){
      localStorage.removeItem('dsite')
      context.commit('deauth')
    }
  },
  modules: {
  }
})
