<script setup>
import SingleProduct from './SingleProduct.vue';
import ProductSearch from './ProductSearch.vue';
import { useProductStore } from '../stores/products';

const store = useProductStore();

store.fetchProducts({
    'keyword': ''
});

function handleSubmit(key) {
    let payload = {
        'keyword': key
    };

    store.fetchProducts(payload);
}

</script>

<template>
    <div>
        <div class="m-3 grid place-items-center">
            <ProductSearch @handle-search="handleSubmit" />
        </div>
        
        <div class="flex flex-wrap justify-center mt-3">
            <SingleProduct v-for="product in store.products" :product="product" :key="product.id"></SingleProduct>
        </div>
    </div>
    
</template>