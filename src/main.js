import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import components from '@/components/UI';
import { BIconCart } from 'bootstrap-icons-vue';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/css/main.css';

const app = createApp(App);

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
app.directive('money', {
  mounted(el, binding) {
    el.innerHTML = formatter.format(binding.value);
  },
  updated(el, binding) {
    el.innerHTML = binding.value === 0 ? '$0' : formatter.format(binding.value);
  }
});

components.forEach(component => {
  app.component(component.name, component);
});

app.component('IconCart', BIconCart);
app.use(store);
app.use(router);
app.mount('#app');
