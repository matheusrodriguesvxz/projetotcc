<template>
    <button class="button" @click="voltarPagina">
    <svg class="svgIcon" viewBox="0 0 384 512">
      <path
        d="M257.4 470.6c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L47.4 302.6c-12.5-12.5-12.5-32.8 0-45.3l164.7-164.7c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L123.3 256l134.1 134.6z"
      ></path>
    </svg>
  </button>
    <h2>Ah, que pena!</h2>
    <h4>Parece que ocorreu algum erro!</h4>
    <p>Tente novamente</p>
</template>

<script>
export default {
  name: "BackButton",
  methods: {
    voltarPagina() {
      this.$router.go(-1); 
    },
  },
};
</script>

<style>
img{
    display: flex;
    justify-content: flex-start;
    margin-top: 30px;
    width: 70px;
}
h2{
  text-align: center;
}
h4{
    color: white;
    margin-top: 30px;
    font-family: Poppins;
    margin-bottom: 0px;
    text-align: center;
}
p{
    color: white;
    font-family: Poppins;
    text-align: center;
}
.concluido{
    width: 100px;
    height: 30px;
    margin-left: 30px;
    background-color: white;
    border-radius: 30px;
    color: black;
    font-family: "Poppins";
    font-weight: 700;
    margin-right: 20px;
    border-bottom: 0px;
    display: flex;
    margin: auto;
    
}

.button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: rgb(20, 20, 20);
    border: none;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    /* box-shadow: 0px 0px 0px 4px rgba(180, 160, 255, 0.253); */
    cursor: pointer;
    transition-duration: 0.3s;
    overflow: hidden;
    position: relative;
    margin-bottom: 0px;
}

.svgIcon {
    width: 12px;
  transition-duration: 0.3s;
}

.svgIcon path {
    fill: white;
}

.button:hover {
    width: 140px;
    border-radius: 50px;
    transition-duration: 0.3s;
    background-color: rgb(181, 160, 255);
    align-items: center;
}
</style>