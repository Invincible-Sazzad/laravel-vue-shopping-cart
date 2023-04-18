import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useFlash } from '@/composables/useFlash';
import { useAuthStore } from "./auth";
import axios from "axios";
import { useRouter } from 'vue-router';

export const useCartStore = defineStore('cart', () => {
    let router = useRouter();
    let { flash } = useFlash();

    let cart = ref([]);
    let taxValue = ref(8);

    const authStore = useAuthStore();

    let itemCount = computed(() => {
        if (cart.value.length === 0) {
            return 0;
        } else {
            return cart.value[0].cart_items.length;
        }
    });

    let subtotalAmount = computed(() => {
        if (cart.value.length === 0) {
            return 0;
        } else {
            return cart.value[0].cart_items.reduce((sum, a) => {
                return sum + (a.quantity * a.product.price)
            }, 0);
        }
    });

    let adjustedTax = computed(() => {
        return (cart.value.length === 0) ? 0 : taxValue.value;
    });


    function redirectUnauthenticatedUser() {
        if (! authStore.token || ! authStore.user) {
            router.push("/");
        }
    }

    function fetchCartItems() {
        let errorStatus = '';

        redirectUnauthenticatedUser();

        const config = authStore.getHeadersConfig();

        axios.get('http://localhost:8000/api/cart/' + authStore.user.id, config)
        .then(response => {
            if (! response.data.error) {
                cart.value = response.data.cart;
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

    function addItemToCart(productId, qty) {
        let errorStatus = '';

        if (! authStore.token || ! authStore.user) {
            flash('error', 'Auth Error', "User seems to be unauthenticated!");
            return;
        }

        const config = authStore.getHeadersConfig();

        let payload = {
            "product_id": productId,
            "user_id": authStore.user.id,
            "quantity": qty
        };

        axios.post('http://localhost:8000/api/cart/store', payload, config)
        .then(response => {
            if (! response.data.error) {
                flash('success', 'Add Item', response.data.message);
                router.push("cart");
            } else {
                flash('error', 'Item Add Error', response.data.message);
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

    function removeAnItem(payload) {
        let errorStatus = '';

        redirectUnauthenticatedUser();

        const config = authStore.getHeadersConfig();

        axios.post('http://localhost:8000/api/cart/removeitem', payload, config)
        .then(response => {
            if (! response.data.error) {
                flash('success', 'Remove Cart Item', response.data.message);
                fetchCartItems();
            } else {
                flash('error', 'Remove Item Error', response.data.message);
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

    function updateQty(payload) {
        let errorStatus = '';

        redirectUnauthenticatedUser();

        const config = authStore.getHeadersConfig();

        axios.post('http://localhost:8000/api/cart/update', payload, config)
        .then(response => {
            if (! response.data.error) {
                flash('success', 'Update Quantity', response.data.message);
                fetchCartItems();
            } else {
                flash('error', 'Update Error', response.data.message);
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

    function checkoutACart(payload) {
        let errorStatus = '';

        redirectUnauthenticatedUser();

        const config = authStore.getHeadersConfig();

        axios.post('http://localhost:8000/api/cart/checkout', payload, config)
        .then(response => {
            if (! response.data.error) {
                flash('success', 'Checkout', response.data.message);
                fetchCartItems();
                router.push("/");
            } else {
                flash('error', 'Checkout Error', response.data.message);
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

    function clearACart(payload) {
        let errorStatus = '';

        redirectUnauthenticatedUser();

        const config = authStore.getHeadersConfig();

        axios.post('http://localhost:8000/api/cart/remove', payload, config)
        .then(response => {
            if (! response.data.error) {
                flash('success', 'Clear Cart', response.data.message);
                fetchCartItems();
            } else {
                flash('error', 'Clear Cart', response.data.message);
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

    return { 
        cart, 
        taxValue, 
        itemCount, 
        subtotalAmount, 
        adjustedTax,
        fetchCartItems, 
        addItemToCart, 
        updateQty, 
        removeAnItem, 
        clearACart, 
        checkoutACart
    };
});
