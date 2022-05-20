import { createStore } from 'vuex';
import brands from './brands';
import products from './products';
import cart from './cart';

export default createStore({
  modules: {
    brands,
    products,
    cart
  },
  strict: process.env.NODE_ENV !== 'production'
});
