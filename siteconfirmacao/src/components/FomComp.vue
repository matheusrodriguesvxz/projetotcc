<template>
<form action="">
    <input type="text" placeholder="Nome"><br>
    <input type="text" placeholder="Idade"><br>
    <input type="text" placeholder="Número de celular"><br>
    <label>Sexo: </label>
    <select name="sexo">
        <option value="f">Feminino</option>
        <option value="m">Masculino</option>
    </select> <br>
    <button>+Adicionar acompanhante:</button>
</form>
</template>

<script>
export default {
    name: "FormComp"
}
</script>

<style>
input{
    margin-top: 15px;
}
select{
    margin-top: 15px;
}
button{
    margin-top: 30px;
    margin-bottom: 10px;
}
</style>