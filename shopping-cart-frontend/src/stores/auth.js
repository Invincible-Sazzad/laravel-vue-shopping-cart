import Api from '@/apis/Api'
import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useFlash } from '@/composables/useFlash'
import { useCartStore } from '@/stores/cart'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const router = useRouter()
    let { flash } = useFlash()

    const cartStore = useCartStore()

    let user = ref(null)
    let token = ref(null)

    function login(payload) {
      let errorStatus = ''

      Api.post('login', payload)
        .then((response) => {
          let result = response.data

          if (!result.error) {
            this.user = result.user
            this.token = result.authorisation.token

            cartStore.fetchCartItems()

            if (cartStore.cart.length > 0) {
              router.push('cart')
            } else {
              router.push('/')
            }
          } else {
            flash('error', 'Auth Error', result.message)
          }
        })
        .catch((error) => {
          if (!error.response) {
            // network error
            errorStatus = 'Network Error'
          } else {
            errorStatus = error.response.data.message
          }
          flash('error', 'Auth Error', errorStatus)
        })
    }

    const isAuthenticated = computed(() => user.value !== null)
    const isTokenEmpty = computed(() => token.value === null)

    function logout() {
      if (isTokenEmpty.value) {
        flash('error', 'Auth Error', 'User is not authenticated!')
        return
      }

      let errorStatus = ''
      axios
        .post('http://localhost:8000/api/logout', {}, getHeadersConfig())
        .then((response) => {
          if (!response.data.error) {
            flash('success', 'Log out', response.data.message)
            this.user = null
            this.token = null
            router.push('/')
          }
        })
        .catch((error) => {
          if (!error.response) {
            // network error
            errorStatus = 'Network Error'
          } else {
            errorStatus = error.response.data.message
          }
          flash('error', 'Auth Error', errorStatus)
        })
    }

    function getHeadersConfig() {
      return {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token.value
        }
      }
    }

    return { user, token, login, logout, isAuthenticated, getHeadersConfig }
  },
  {
    persist: true
  }
)
