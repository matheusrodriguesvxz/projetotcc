<template>
  <div class="conteudo">
    <img class="convite"
      src="https://cdn.create.microsoft.com/catalog-assets/pt-br/da4bd1d7-fe8c-4b35-b475-8230a29af7d2/thumbnails/400/panfleto-de-convite-para-festa-purple-organic-boho-0-1-c39188cc1787.webp">
      <fieldset>
    <legend>
      <h4>Você confirma sua presença?</h4>
      <button class="seta">
        <svg class="svgIcon" viewBox="0 0 384 512">
          <path
            d="M168.5 441.4c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v306.8l-104.5-104.5c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
          ></path>
        </svg>
      </button>
    </legend>

    <div class="beThere">
      <div class="iWill">
        <input type="radio" id="sim" name="interesse" value="sim" />
        <label for="music"> Sim, estarei presente </label>
      </div>
      <div class="iCant">
        <input type="radio" id="nao" name="interesse" value="nao" />
        <label for="music"> Não vou conseguir ir </label>
      </div>
    </div>
    <button class="sendConfirm" id="enviar" @click="teste">
      <h5>Enviar</h5>
    </button>
  </fieldset>
  </div>
</template>

<script>
export default {
  name: 'ContentPage',
  methods: {
    teste() {
      const sim = document.getElementById("sim");
      const nao = document.getElementById("nao");

      if (sim.checked) {
        window.location.href = "/dados";
      } else if (nao.checked) {
        window.location.href = "/quepena";
      } else {
        alert("Por favor, selecione uma opção.");
      }
    }
  }
}
</script>

<style scoped>
/* .conteudo{
  background-image: url(/siteconfirmacao/src/assets/festa.png)
} */
.convite{
  width: 23%;
  margin: auto;
  margin-top: 1%;
}

legend {
  margin: auto;
}

h4 {
  font-family: "Poppins", sans-serif;
  margin-bottom: 10px;
  font-size: 1.2rem;
  text-align: center;
}

.beThere{
  margin-left: 26%;
}

.sendConfirm {
  margin-top: 15px;
  padding: 15px;
  width: 200px;
  /* height: 40px; */
  margin-left: 41%;
  margin-bottom: 10px;
  background-color: #48138ed4;
  border-radius: 30px;
  color: white;
  font-family: "Poppins";
  font-weight: 700;
  font-size: 15px;
}

label {
  font-family: "Poppins";
}

.seta {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: rgba(20, 20, 20, 0);
  border: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition-duration: 0.3s;
  overflow: hidden;
  margin: auto;
  margin-bottom: 30%
}

.svgIcon {
  width: 40%;
  transition-duration: 0.3s;
}

.svgIcon path {
  fill: white;
}

.svgIcon {
  animation: moveIcon 1s infinite;
}

@keyframes moveIcon {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(15px); 
  }
  100% {
    transform: translateY(0);
  }
}

</style>