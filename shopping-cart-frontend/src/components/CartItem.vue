<script setup>
import { useCartStore } from '@/stores/cart';
import { ref } from 'vue';

const cartStore = useCartStore();

const props = defineProps({
    cartItem: Object,
    cartId: Number
});

let qtyCount = ref(props.cartItem.quantity);

let payload = {
    'cart_id': props.cartId,
    'product_id': props.cartItem.product.id,
};

function incrementQty() {
    qtyCount.value++;

    payload.quantity = qtyCount.value;

    cartStore.updateQty(payload);
}

function decrementQty() {
    qtyCount.value--;

    if (qtyCount.value < 0) qtyCount.value = 0;

    payload.quantity = qtyCount.value;

    cartStore.updateQty(payload);
}

function removeItem() {
    if (confirm("Are you sure?")) {
        cartStore.removeAnItem(payload);
    }
}

</script>

<template>
    <div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
        <div class="flex w-2/5"> 
          <div class="w-20">
            <img class="h-24" :src="props.cartItem.product.image_url" alt="">
          </div>
          <div class="flex flex-col justify-between ml-4 flex-grow">
            <span class="font-bold">{{ props.cartItem.product.title }}</span>
            <a @click.prevent="removeItem" class="cursor-pointer font-semibold hover:text-red-500 text-purple-500 text-sm">Remove</a>
          </div>
        </div>

        <div class="flex justify-center w-1/5">
            <div @click.prevent="decrementQty" class="flex items-center px-2 cursor-pointer hover:bg-purple-400">
                <svg class="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                    <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
                </svg>
            </div>
          <input class="mx-2 border text-center w-8" v-model="qtyCount" type="number">
          <div @click.prevent="incrementQty" class="flex items-center px-2 cursor-pointer hover:bg-purple-400">
            <svg class="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
            </svg>
          </div>
        </div>
        <span class="text-center w-1/5 font-semibold text-sm">${{ props.cartItem.product.price }}</span>
        <span class="text-center w-1/5 font-semibold text-sm">${{ (props.cartItem.product.price) * (qtyCount) }}</span>
      </div>
</template>

<style scoped>

</style>>