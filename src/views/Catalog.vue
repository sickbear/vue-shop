<template>
  <section class="catalog">
			<div class="container">
				<div class="row">
					<div class="sidebar col-lg-4 col-xl-2">
						<ul class="list-unstyled d-flex flex-lg-column flex-wrap justify-content-start gap-3 gap-lg-1">
              <li class="mb-1 sidebar__link" @click="showAll">
                <span class="catalog__all" :class="{'sidebar__link_active': !currentBrand}">All brands</span>
              </li>
							<li 
                v-for="brand in brands" 
                class="mb-1 sidebar__link"
                :key="brand.id"
                :class="{'sidebar__link_active': currentBrand === brand.id}"
                @click="showBrand(brand.id)">
                {{ brand.title }}
              </li>
						</ul>
					</div>
					<div class="catalog col-lg-8 col-xl-10">
						<p class="title text-uppercase fs-4">Catalog</p>
            <div class="catalog__list row">
                <catalog-card 
                  v-for="product in currentList" 
                  :key="product.id"
                  :id="product.id"
                  :image="product.image"
                  :title="product.title"
                  :brand="getBrand(product.brand)['title']"
                  :price="product.regular_price.value"
                ></catalog-card>
						</div>
					</div>
				</div>
			</div>
		</section>
</template>

<script>
  import { mapGetters, mapState } from 'vuex';
  import CatalogCard from '@/components/CatalogCard';

  export default {
    components: {
      CatalogCard
    },
    data() {
      return {
        currentBrand: null
      }
    },
    computed: {
      ...mapState('cart', {proccessId: 'proccessId', cart: 'products'}),
			...mapGetters('products', { products: 'all' }),
			...mapGetters('brands', { brands: 'all', getBrand: 'one' }),
      filteredProducts() {
        return this.products.filter(product => product.brand === this.currentBrand)
      },
      currentList() {
        return this.currentBrand ? this.filteredProducts : this.products;
      }
		},
    methods: {
      showAll() {
        this.currentBrand = null;
      },
      showBrand(id) {
        this.currentBrand = id;
      }
    },
  }
</script>

<style lang="scss" scoped>
  .catalog{
    &__list{
      row-gap: 1.4rem;
    }

    &__all{
      border-bottom: 1px dashed $success;
    }
  }

  .sidebar{
    &__link{
      color: $success;
      font-size: .96rem;
      cursor: pointer;

      &:hover{
        color: $green-300;
      }

      &_active{
        font-family: $f500;
        color: $green-700;

        &:hover{
          color: $green-700;
        }  
      }
    }
	}
</style>