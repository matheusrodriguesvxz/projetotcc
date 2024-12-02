<template>
    <NavComp></NavComp>
    <DadosComp></DadosComp>
</template>

<script>
import DadosComp from '../DadosComp.vue';
import NavComp from '../NavComp.vue';
// import FooterComp from '../FooterComp.vue';

export default {
    name: 'DadosPage',
    components: {
        NavComp,
        DadosComp,
        // FooterComp
    }
}
</script>


<style>

</style>