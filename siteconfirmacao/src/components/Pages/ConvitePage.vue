<template>
<NavComp></NavComp>
<ContentComp></ContentComp>
<FooterComp></FooterComp>
</template>

<script>
import ContentComp from '../ContentComp.vue';
import FooterComp from '../FooterComp.vue';
import NavComp from '../NavComp.vue';

export default {
    name: 'ConvitePage',
    components: {
        NavComp, ContentComp, FooterComp
    }
}
</script>

<style>

</style>