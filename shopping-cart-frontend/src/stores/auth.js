import Api from "@/apis/Api";
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useFlash } from '@/composables/useFlash';

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();
  let { flash } = useFlash();

  let user = ref({});
  let token = ref(null);

  function login(payload) {
    let errorStatus = '';

    Api.post('login', payload)
    .then(response => {
      let result = response.data;

      if (! result.error) {
        this.user = result.user;
        this.token = result.authorisation.token;

        // setTimeout(() => {
        //   router.push('products');
        // }, 1500);
      } else {
        flash('error', 'Auth Error', result.message);
      }

    }).catch(error => {
      if (!error.response) {
          // network error
          errorStatus = 'Network Error';
      } else {
          errorStatus = error.response.data.message;
      }
      flash('error', 'Auth Error', errorStatus);
    });
  }

  return { user, token, login };
});
