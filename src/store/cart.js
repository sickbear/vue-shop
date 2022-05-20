export default {
	namespaced: true,
	state: {
		products: [],
    proccessId: [],
    token: null
	},
	getters: {
		inCart: (state, getters) => id => state.products.findIndex(curId => curId.id === id) !== -1,
    inProccess: state => id => state.proccessId.includes(id),
    cartCount: state => state.products.length,
    productsDetails(state, getters, rootState, rootGetters){	
      return state.products.map(product => {
        let curProduct = rootGetters['products/one'](product.id);
        let price = curProduct.regular_price.value;
        let title = curProduct.title;
        let img = curProduct.image;
        let brand = curProduct.brand;
      
        return {
          ...product,
          title,
          price,
          img,
          brand
        }
      });
    },
    total(state, getters){
      return getters.productsDetails.reduce((total, product) => {
        return total + product.price * product.cnt;
      }, 0);
    },
	},
  mutations: {
    add(state, { id }) {
      state.products.push({ id, cnt: 1 });
    },
    remove(state, { id }) {
      state.products = state.products.filter(product => product.id !== id);
    },
    setCnt(state, { id, cnt }) {
      let item = state.products.find(product => product.id === id);
      item.cnt = cnt;
    },
    startProccess(state, id) {
      state.proccessId.push(id);
    },
    endProccess(state, id){
      state.proccessId = state.proccessId.filter(curId => curId !== id);
    },
    clear(state) {
      state.products = [];
    }
  },
  actions: {
    add({ state, getters, commit }, { id }) {
      commit('startProccess', id);
      
      let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('add', { id });
          resolve({ status: 'success' });
        }, 300);
      });
      
      promise.then(res => {
        if (res.status === 'success') {
          commit('endProccess', id);
        }
      });
    },
    remove({ state, getters, commit }, { id }) {
      commit('startProccess', id);
      
      let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('remove', { id });
          resolve({ status: 'success' });
        }, 300);
      });
      
      promise.then(res => {
        if (res.status === 'success') {
          commit('endProccess', id);
        }
      });
    },
    setCnt({ state, getters, commit, dispatch }, { id, cnt }) {
      commit('startProccess', id);
      let validCnt = Math.max(1, cnt);
      
      let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('setCnt', { id: id, cnt: validCnt });
          resolve({ status: 'success' });
        }, 300);
      });

      promise.then(res => {
        if (res.status === 'success') {
          commit('endProccess', id);
        }
      });
    },
    clearCart({ commit }) {
      commit('clear');
    }
  }
}