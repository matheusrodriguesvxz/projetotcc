<template>
    <NavComp></NavComp>
    <DadosComp></DadosComp>
    <FooterComp></FooterComp>
</template>

<script>
import DadosComp from '../DadosComp.vue';
import FooterComp from '../FooterComp.vue';
import NavComp from '../NavComp.vue';

export default {
    name: 'DadosPage',
    components: {
        NavComp, DadosComp, FooterComp
    }
}
</script>

<style></style>