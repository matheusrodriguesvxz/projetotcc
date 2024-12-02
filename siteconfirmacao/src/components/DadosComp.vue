<template>
<div class="instrucoes">
<p>Para confirmar sua presença, preencha as seguinte informações:</p>
<img class="setinha" src="../assets/angulo-para-baixo.png" alt="">
</div>
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

<style scoped>
.instrucoes{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding-top: 10%;
    position: relative;
    bottom: 70px;
    font-family: "Arial", sans-serif;
    text-align: center;
    border-radius: 20px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
    background-image: url('../assets/BackgroundForm.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
p{
    font-family: poppins;
    margin-top: 40px;
}
.form{
    margin-top: 20px;
}

.setinha{
    max-width: 9%;
    max-height: 9%;
    padding-top: 40%;
    margin: auto;

}
</style>