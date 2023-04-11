<script setup>
import { ref } from 'vue';
import Api from '@/apis/Api';
import { useRouter, RouterLink } from 'vue-router';
import { useFlash } from '@/composables/useFlash';

let name = ref(null);
let email = ref(null);
let password = ref(null);

const router = useRouter();

let { flash } = useFlash();

const registerUser = () => {    
    let errorStatus = '';

    let payload = {
        'name': name.value,
        'email': email.value,
        'password': password.value,
    };

    Api.post('register', payload)
    .then(response => {
        let result = response.data;
        console.log(result);
        if (! result.error) {
            flash('success', 'Registration Completed', result.message);
            setTimeout(()=>{
                router.push('login');
            }, 2000);
        } else {
            flash('error', 'Registration Error', result.message);
        }
    }).catch(error => {
        if (!error.response) {
            // network error
            errorStatus = 'Error: Network Error';
        } else {
            errorStatus = error.response.data.message;
        }
        console.log(errorStatus);
        flash('error', 'Registration Error', errorStatus);
    });
    
};

</script>

<template>
    <div class="h-screen flex flex-wrap justify-center items-center">
        <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow font-Roboto sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form class="space-y-6" @submit.prevent="registerUser">
                <h5 class="text-xl text-center font-medium text-gray-900 dark:text-white">Create your account</h5>
                <div>
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                    <input type="text" v-model="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="type your name" required>
                </div>
                <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" v-model="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required>
                </div>
                <div>
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input type="password" v-model="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                </div>
                <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
                <div class="text-sm text-center font-medium text-gray-500 dark:text-gray-300">
                    Already registered? <RouterLink to="login" class="text-blue-700 hover:underline dark:text-blue-500">Login here</RouterLink>
                </div>
            </form>
        </div>
    </div>
    
</template>