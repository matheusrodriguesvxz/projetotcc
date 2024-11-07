<template>
<img src="https://cdn.create.microsoft.com/catalog-assets/pt-br/da4bd1d7-fe8c-4b35-b475-8230a29af7d2/thumbnails/400/panfleto-de-convite-para-festa-purple-organic-boho-0-1-c39188cc1787.webp">
<fieldset>
  <legend><h4>Você confirma sua presença?</h4></legend>
  <div>
    <input
      type="radio" id="sim" name="interesse" value="sim" />
    <label for="music"> Sim, estarei presente </label>
  </div>
  <div>
    <input type="radio" id="nao" name="interesse" value="nao" />
    <label for="music"> Não conseguirei ir </label>
  </div>
  <button><h5>Enviar</h5></button>
</fieldset>
</template>

<script>
export default {
    name: 'ContentPage'
}
</script>

<style scoped>
legend{
    margin: auto;
}
button{
    margin-top: 10px;
    padding: 5px;
}

</style>