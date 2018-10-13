<template>
    <person :person="person">
        <div v-if="person.instrument" class="uppercase text-grey-darker text-xs">{{ person.instrument }}</div>
    </person>
</template>

<script>
import person from './Person.vue'

export default {
    props: ['person'],
    components: {
        person
    },
}
</script>
