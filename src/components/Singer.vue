<template>
    <div class="m-4 font-bold singer flex flex-col items-center w-24 text-center justify-between">
        <img :src="person.avatar" class="w-24 h-24 mb-2 rounded-full block" :class="`mic-${person.mic}`" />
        <div class="mb-4">{{ person.name }}</div>
        <select @change="changeMic" class="block w-24">
            <option value="">--</option>
            <option v-for="mic in mics" :value="mic" :key="mic" :selected="person.mic === mic">{{ mic }}</option>
        </select>
    </div>
</template>

<script>
export default {
    props: ['person', 'mics', 'changeMicValue', 'index'],
    data: function(){
        return {
           
        }
    },
    methods: {
        changeMic(e){
            this.changeMicValue(e.target.value, this.index);
        }
    }
}
</script>

<style lang="scss" scoped>
    img {
        &:hover {
            cursor: move;
        }
    }
    [class*="mic-"] {
        border: 8px solid transparent;
    }

    .mic {
        &-lead {
            border-color: blue;
        }

        &-co-lead {
            border-color: red;
        }

        &-bgv1 {
            border-color: gold;
        }

        &-bgv2 {
            border-color: limegreen;
        }

        &-bgv3 {
            border-color: orange;
        }

        &-bgv4 {
            border-color: mediumpurple;
        }

        &-bgv5 {
            border-color: blue;
        }

        &-bgv6 {
            border-color: yellow;
        }
    }
</style>
