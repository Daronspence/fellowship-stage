<template>
    <person :person="person" class="flex flex-col items-center justify-between">
        <img slot="avatar" :src="person.avatar" class="w-24 h-24 mb-2 rounded-full block" :class="`mic-${person.mic}`" />
        <select @change="changeMic" class="block w-24">
            <option value="">--</option>
            <option v-for="mic in mics" :value="mic" :key="mic" :selected="person.mic === mic">{{ mic }}</option>
        </select>
    </person>
</template>

<script>
import person from './Person.vue'
export default {
    props: ['person', 'mics', 'index'],
    components: {
        person
    },
    methods: {
        changeMic(e){
            this.$emit('change-mic', e.target.value);
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
            border-color: saddlebrown;
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
