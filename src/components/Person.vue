<template>
    <div class="m-4 font-bold person text-center w-24" v-if="person">
        <img :src="person.avatar" class="w-24 h-24 mb-2 rounded-full block" />
        <div>{{ person.name }}</div>
        <div v-if="person.instrument" class="uppercase text-grey-darker text-xs">{{ person.instrument }}</div>
    </div>
</template>

<script>
export default {
    props: ['person'],
    data: function(){
        return {
           
        }
    }
}
</script>
