import brands from '@/assets/json/brands.json';

export default {
	namespaced: true,
	state: {
		brands: brands
	},
	getters: {
		all: state => state.brands,
    one: state => id => state.brands.find(brand => brand.id == id),
	},
}