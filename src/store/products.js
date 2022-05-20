import products from '@/assets/json/products.json';

export default {
	namespaced: true,
	state: {
		products: products
	},
	getters: {
		all: state => state.products,
		one: state => id => state.products.find(product => product.id == id),
	},
}