<template>
  <div class="col-12 col-md-6 col-xl-4">
    <div class="card">
      <div class="card-body">
        <img class="card__image" :src="getImgUrl(image)" alt="">
        <h5 class="card-title card__title">{{ title }}</h5>
        <p class="card-text card__brand">{{ brand }}</p>
        <p class="card-text card__price" v-money="price"></p>

        <app-button 
          type="button" 
          class="btn-danger card__link"
          v-if="inCart(id)"
          :disabled="inProccess(id)"
          @click="remove({ id })">
          Remove
        </app-button>
        <app-button 
          type="button" 
          class="btn-warning card__link"
          v-else
          :disabled="inProccess(id)"
          @click="add({ id })">
          Add to cart
        </app-button>

      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    props: {
      id: {
        type: Number,
        required: true
      },
      image: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      brand: {
        type: String,
        default: 'No name'
      },
      price: {
        type: Number,
        required: true
      },
    },
    computed: {
      ...mapGetters('cart', { inCart: 'inCart', inProccess: 'inProccess' }),
    },
    methods: {
      ...mapActions('cart', ['add', 'remove']),
      getImgUrl(img) {
        return require('../assets' + img);
      }
    }
  }
</script>

<style lang="scss">
  .card{
    min-width: 280px;

    &__link{
      font-size: .95rem;
    }

    &__image{
      width: 100%;
    }

    &__title{
      font-family: $f500;
    }

    &__brand{
      font-size: .95rem;
      color: $secondary;
    }

    &__price{
      font-family: $f600;
      font-size: 1.2rem;
    }
  }
</style>