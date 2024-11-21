<template>
<NavComp></NavComp>
<QuePenaComp></QuePenaComp>
</template>

<script>
import QuePenaComp from '../QuePenaComp.vue';
import NavComp from '../NavComp.vue';

export default {
    name: "QuePenaPage",
    components: {
        QuePenaComp,
        NavComp}
        
}
</script>

<style scoped>
body{
    background-color: rgba(85, 9, 156, 0.914);
    background-repeat: no-repeat;

}
h2{
    margin-top: 0px;
}
</style>