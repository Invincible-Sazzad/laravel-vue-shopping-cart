import Api from "@/apis/Api";
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useFlash } from '@/composables/useFlash';

export const useProductStore = defineStore('products', () => {
  let { flash } = useFlash();

  let products = ref(null);
  let singleProduct = ref(null);

  function fetchProducts(payload) {
    let errorStatus = '';

    Api.post('products', payload)
    .then(response => {
      let result = response.data;

      if (! result.error) {
        this.products = result.products;
      } else {
        flash('error', 'Download Error', result.message);
      }

    }).catch(error => {
      if (!error.response) {
          // network error
          errorStatus = 'Network Error';
      } else {
          errorStatus = error.response.data.message;
      }
      flash('error', 'Server Error', errorStatus);
    });
  }

  function fetchAProduct(id) {
    let errorStatus = '';

    Api.get('products/' + id)
    .then(response => {
      let result = response.data;

      if (! result.error) {
        this.singleProduct = result.product;
      } else {
        flash('error', 'Download Error', result.message);
      }

    }).catch(error => {
      if (!error.response) {
          // network error
          errorStatus = 'Network Error';
      } else {
          errorStatus = error.response.data.message;
      }
      flash('error', 'Server Error', errorStatus);
    });
  }


  return { products, singleProduct, fetchProducts, fetchAProduct };
});
