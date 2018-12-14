<template>
    <ul class="mb-4 list-reset">
        <li v-for="person in value" :key="person.name" class="inline-block rounded-full bg-grey mr-4 mb-2 text-xs">
            <label class="cursor-pointer px-4 py-2 inline-block">
                {{ person.name }}
                <input type="checkbox" :checked="person.visible" @change="update($event, person)" />
            </label>
        </li>
    </ul>
</template>

<script>
export default {
    // array of people objects
    props: ['value'],
    methods: {
        update(e, person){
            // don't overwrite our main data with an empty array
            if (!this.value.length) return;

            // is there a less hacky way to do all of this?
            let people = JSON.parse(JSON.stringify(this.value)).map(p => {
                // p is a person object
                if (p.name === person.name){
                    p.visible = e.target.checked
                }
                return p
            })
            this.$emit('input', people);
        }
    }
}
</script>

<style lang="scss" scoped>

</style>