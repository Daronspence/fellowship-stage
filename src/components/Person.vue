<template>
    <div class="m-4 font-bold text-center w-24" v-if="person">
        <slot name="avatar">
            <img :src="person.avatar" class="w-24 h-24 mb-2 rounded-full block" />
        </slot>
        <div>{{ person.name }}</div>
        <slot></slot>
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
