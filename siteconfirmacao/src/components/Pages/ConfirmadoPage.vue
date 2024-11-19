<template>
<div class="teste">
    <ConfirmadoComp></ConfirmadoComp>
</div>

</template>

<script>
import ConfirmadoComp from '../ConfirmadoComp.vue';
export default {
    name: 'ConfirmadoPage',
    components: {
        ConfirmadoComp
    }
}
</script>

<style>

body{
    background-image: url(../../assets/PurpleBackground.png);
    background-repeat: no-repeat    ;

}
.teste{
    display: flex;
    justify-content: flex-start;
    margin-top: 50px;
}
</style>