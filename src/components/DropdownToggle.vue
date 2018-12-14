<template>
    <div>
        <button @click="show = !show" 
                class="border-green-dark border-2 text-green-dark text-sm text-white rounded-sm px-4 py-2 mb-4 focus:shadow-outline focus:bg-green-dark focus:text-white"
                :aria-expanded="show ? 'true' : 'false'">
            {{ buttonText }}
            <span class="text-xs inline-block ml-2">
                <span v-if="show">&#9660;</span>
                <span v-else>&#9654;</span>
            </span>
        </button>
        <slot v-if="show"></slot>
    </div>
</template>

<script>
export default {
    // array of people objects
    props: {
        buttonText: {
            type: String,
            default: "Toggle",
        }
    },
    data: function(){
        return {
            show: false
        }
    }
}
</script>

<style lang="scss" scoped>

</style>