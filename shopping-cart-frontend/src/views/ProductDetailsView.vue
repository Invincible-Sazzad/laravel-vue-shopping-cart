<script setup>
import { useProductStore } from '@/stores/products';
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';
import { useFlash } from '@/composables/useFlash';
import { useRouter } from 'vue-router';

let router = useRouter();
let { flash } = useFlash();

const authStore = useAuthStore();
const cartStore = useCartStore();

const props = defineProps({
    id: String
});

const store = useProductStore();

store.fetchAProduct(props.id);

function handAddToCart() {
    if (authStore.isAuthenticated) {
        cartStore.addItemToCart(props.id, 1);
    } else {
        flash('warning', "Unauthenticated", "Please sign in first!");
        setTimeout(() =>  {
            router.push("/login");
        }, 1500);
    }   
}

</script>

<template>
    <div v-if="store.singleProduct !== null" class="flex flex-wrap justify-center mt-5">
        <div class="min-w-[450px]">
            <img class="object-cover w-[100%] max-w-[450px] rounded-t-lg md:rounded-none md:rounded-l-lg" :src="store.singleProduct.image_url" alt="product image">
        </div>
        
        <div class="flex flex-col pl-4 pr-4 leading-normal min-w-[300px]">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {{ store.singleProduct.title }}
            </h5>
            
            <p class="mb-3 font-normal text-small text-gray-700 dark:text-gray-400">
                {{ store.singleProduct.description }}
            </p>

            <div class="mt-3 flex items-center justify-between">
                <span class="text-3xl font-bold text-gray-900 dark:text-white">${{ store.singleProduct.price }}</span>
                <a @click.prevent="handAddToCart" class="cursor-pointer text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-small rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                    Add to cart
                </a>
            </div>
        </div>
    </div>
</template>
