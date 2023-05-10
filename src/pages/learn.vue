<template>
    <li>
        <img v-lazy="src">
    </li>
</template>

<script>
export default {
    name: 'LEARN',
    data() {
        return {
            src: 'images/banner1.png'
        }
    },

}
</script>

<style></style>