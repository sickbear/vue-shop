<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-xxl-10">

        <template v-if="products.length">
          <div class="d-flex justify-content-between">
            <p class="title text-uppercase fs-4">Your cart</p>
            <router-link class="text-success" :to="{ name: 'catalog' }" exact>back to catalog</router-link>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th class="d-none d-md-table-cell">#</th>
                <th>Item</th>
                <th class="d-none d-sm-table-cell">Price</th>
                <th class="text-center">Quantity</th>
                <th class="text-end">Total</th>
              </tr>
            </thead>
            <tbody>
              <cart-card
                v-for="(product, i) in products"
                :key="product.id"
                :number="i + 1"
                :id="product.id"
                :img="getImgUrl(product.img)"
                :title="product.title"
                :brand="getBrand(product.brand)['title']"
                :price="product.price"
                :cnt="product.cnt"
              ></cart-card>
            </tbody>
          </table>
          <div class="text-end fw-bold fs-5 mb-5">
            Subtotal: <span class="text-danger fs-5" v-money="subtotal"></span>
          </div>
          <div class="row justify-content-center justify-content-md-end">
            <form class="col-12 col-sm-10 col-md-6 col-xl-4">


              <div class="mb-3" v-for="(field, i) in user" :key="field.name">
                <div class="input-group">
                  <app-input 
                    :name="field.name"
                    :type="field.type"
                    :placeholder="field.placeholder"
                    :valid="field.valid"
                    :value="field.value"
                    @updated="onInput(i, $event)">
                  </app-input>
                  <app-button 
                    class="btn-outline-secondary" 
                    type="button"
                    v-if="field.name === 'phone'"
                    :disabled="!formReady"
                    @click.prevent="sendForm">
                    Submit
                  </app-button>
                </div>
              </div>

            </form>
          </div>
        </template>

        <template v-else>
          <div class="d-flex justify-content-between">
            <p class="title text-uppercase fs-4">Your cart is empty</p>
            <router-link class="text-success" :to="{ name: 'catalog' }" exact>back to catalog</router-link>
          </div>
        </template>

      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import CartCard from '@/components/CartCard';

  export default {
    components: {
      CartCard
    },
    data: () => ({
      user: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Your name',
          value: '',
          pattern: /^[a-zA-Z ]{2,30}$/
        },
        {
          name: 'phone',
          type: 'tel',
          placeholder: 'Your phone',
          value: '',
          pattern: /^[0-9]{7,14}$/
        }
      ],
    }),
    computed: {
      ...mapGetters('cart', { products: 'productsDetails', subtotal: 'total' }),
      ...mapGetters('brands', { getBrand: 'one' }),
      fieldsDone() {
        return this.user.reduce((total, field) => {
          return total + (field.valid ? 1 : 0);
        }, 0);
      },
      formReady() {
        return this.fieldsDone === this.user.length;
      },
    },
    methods: {
      ...mapActions('cart', { clear: 'clearCart' }),
      getImgUrl(img) {
        return require('../assets' + img);
      },
      onInput(i, value) {
        let field = this.user[i];
        field.value = value.trim();
        field.valid = field.pattern.test(field.value);
      },
      sendForm() {
        let sendData = {};
        this.user.forEach((field, i) => {
          sendData[field.name] = field.value;
          this.$nextTick(() => {
            this.user[i].value = '';
          });
        });
        this.clear();
        console.info(sendData);
      }
    },
    created() {
      return this.user.forEach(field => {
        field.valid = field.pattern.test(field.value); 
      });
    }
  }
</script>
