<template>
    <div>
        <span>home</span>
        <testOne ref="testOneRef" />
        <button @click="counter.inc()">{{ counter.num }}</button>
        <div>
            <img src="@/assets/img/demo.jpg" alt="" srcset="">
        </div>
        <div>
            {{ VITE_BASE_API.VITE_BASE_API }}
        </div>
    </div>
</template>
<script setup>
import testOne from "../../components/testOne.vue";
import { useCounterStore } from "../../store/counter";

const counter = useCounterStore()


const VITE_BASE_API = import.meta.env
console.log("VITE_BASE_API ==", VITE_BASE_API);
// let  testOneRef = ref()
// console.log("testOneRef ==", testOneRef);
</script>