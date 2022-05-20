<template>
  <input 
    class="form-control" 
    :class="{ 'is-valid': valid, 'is-invalid': activated && !valid }" 
    @input="onInput">
</template>

<script>
  export default {
    name: 'app-input',
    props: ['valid', 'value'],
    data: () => ({
      activated: false
    }),
    methods: {
      onInput(e){
          this.activated = true;
          this.$emit('updated', e.target.value);
      }
    },
  }
</script>
