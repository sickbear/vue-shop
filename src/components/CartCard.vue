<template>
  <tr class="align-middle">
    <td class="d-none d-md-table-cell">{{ number }}</td>
    <td>
      <img :src="img" class="d-block d-sm-inline me-3" alt="">
      <span class="fw-bold d-none d-md-inline">{{ brand }}</span>
      <span class="d-none d-md-inline">&nbsp;/&nbsp;</span>
      {{ title }}
    </td>
    <td class="d-none d-sm-table-cell" v-money="price"></td>
    <td class="text-center">
      {{ cnt }}&nbsp;
      <div class="btn-group" role="group" aria-label="Basic mixed styles">
        <button 
          type="button" 
          class="btn btn-danger"
          :disabled="inProccess(id)"
          @click="setCnt({ id: id, cnt: cnt - 1 })">
          -
        </button>
        <button 
          type="button" 
          class="btn btn-success"
          :disabled="inProccess(id)"
          @click="setCnt({ id: id, cnt: cnt + 1 })">
          +
        </button>
      </div>
    </td>
    <td v-money="itemTotalPrice" class="text-success text-end fw-bold"></td>
  </tr>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    props: {
      number: {
        type: Number,
        required: true
      },
      id: {
        type: Number,
        required: true
      },
      cnt: {
        type: Number,
        required: true
      },
      img: {
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
      ...mapGetters('cart', { inProccess: 'inProccess' }),
      itemTotalPrice() {
        return this.price * this.cnt;
      }
    },
    methods: {
      ...mapActions('cart', { setCnt: 'setCnt' }),
    }
  }
</script>

<style lang="scss" scoped>
  img{
    width: 60px;
  }
</style>