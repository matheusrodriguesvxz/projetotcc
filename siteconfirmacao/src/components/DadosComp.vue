<template>
<p>Para confirmar sua presença, preencha as seguinte informações:</p>
<div class="form">
<FomComp></FomComp>
</div>
</template>

<script>
import FomComp from './FomComp.vue';

export default {
    name: "DadosComp",
    components: {FomComp}
}
</script>

<style>
p{
    margin-top: 40px;
}
.form{
    margin-top: 20px;
}
</style>