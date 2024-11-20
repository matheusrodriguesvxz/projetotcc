<template>
    <img src="@/assets/logo.svg">
    <h2>Obrigada pela confirmação.</h2>
    <h4>Te espero lá!!!</h4>
    <button>Concluído</button>
</template>

<script>
export default {
    name: "ConfirmadoComp"
}
</script>

<style>
img{
    display: flex;
    justify-content: flex-start;
    margin-top: 30px;
    width: 70px;
}
h2{
    color: white;
    margin-top: 70px;
    font-family: Poppins;
}
h4{
    color: white;
    margin-top: 30px;
    font-family: Poppins;
    margin-bottom: 200px;
}
button{
    width: 100px;
    height: 30px;
    margin-left: 30px;
    background-color: white;
    border-radius: 30px;
    color: black;
    font-family: "Poppins";
    font-weight: 700;
    border-top: 50px;
    margin-right: 20px;
}
</style>