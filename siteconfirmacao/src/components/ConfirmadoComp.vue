<template>
    <img src="@/assets/logo.svg">
    <h2>Obrigada pela confirmação.</h2>
    <h4>Te espero lá!!!</h4>
    <button class="endConfirm">Concluído</button>
</template>

<script>
export default {
    name: "ConfirmadoComp"
}
</script>

<style>
img {
    display: flex;
    justify-content: flex-start;
    margin-top: 30px;
    width: 70px;
}

h2 {
    color: white;
    margin-top: 70px;
    font-family: Poppins;
}

h4 {
    color: white;
    margin-top: 30px;
    font-family: Poppins;

}

.endConfirm {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    border-radius: 30px;
    height: 30px;
    background-color: white;
    color: black;
    font-family: "Poppins";
    font-weight: 700;
    border-top: 50px;
    margin: auto;
    margin-top: 30px;

}

@media (max-width: 768px) {
   img{
    display: flex;
    align-items: center;
    justify-items: center;
    margin: auto;
}
}

@media (max-width: 480px) {
    img{
    display: flex;
    align-items: center;
    justify-items: center;
    margin: auto;
}
}

</style>