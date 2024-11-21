<template>
<NavComp></NavComp>
<ContentComp></ContentComp>
<!-- <FooterComp></FooterComp> -->
</template>

<script>
import NavComp from '../NavComp.vue';
import ContentComp from '../ContentComp.vue';
// import FooterComp from '../FooterComp.vue';

export default {
    name: 'ConvitePage',
    components: {
        NavComp,
        ContentComp, 
        // FooterComp
    }
}
</script>

<style scoped>

</style>