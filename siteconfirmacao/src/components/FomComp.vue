<template>
<form v-for="(form, index) in lista" :key="index" @submit.prevent="true">
    <input type="text" placeholder="Nome"><br>
    <input type="text" placeholder="Idade"><br>
    <input type="text" placeholder="Número de celular"><br>
    <label>Sexo: </label>
    <select name="sexo">
        <option value="f">Feminino</option>
        <option value="m">Masculino</option>
    </select> <br>
</form>
<button class="acomp" @click="adicionarAcompanhante">+Adicionar acompanhante</button>
<button class="envio">Enviar</button>
</template>

<script>
export default {
    name: "FormComp",
    data(){
        return{
            lista: [1]
        }
    },
    methods:{
        adicionarAcompanhante(){
            this.lista.push(1)
        }
    }
}
</script>

<style>
input{
    margin-top: 15px;
    width: 200px;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-color: #760BFF;
    font-family: "Poppins";
}
label{
    font-family: "Poppins";
}
select{
    margin-top: 15px;
    font-family: "Poppins";
}
button{
    margin-top: 30px;
    margin-bottom: 150px;
}
.envio{
    width: 100px;
    height: 30px;
    margin-left: 30px;
    background-color: black;
    border-radius: 30px;
    color: white;
    font-family: "Poppins";
    font-weight: 700;
}
.acomp{
    width: 200px;
    height: 30px;
    margin-left: 30px;
    border-radius: 30px;
    font-family: "Poppins";

}
</style>