<template>
    <div>
        {{ title }}
    </div>
</template>
<script>
import { reactive, toRef } from 'vue'
export default {
    name: 'App',
    setup() {
        const state = reactive({
            title: 'star gite',
        })
        return {
            ...toRef(state)
        }


    }


}


</script>