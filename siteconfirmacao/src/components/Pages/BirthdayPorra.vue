<template>
  <div class="invitation">
    <div class="invitation-header">
      <h1 style="color: white;">Joao Vitor Diamon</h1>
      <h2>Parabéns</h2>
      <p>Celebre meu aniversário comigo! Te espero lá!</p>
    </div>

    <div class="location">
      <p>local: 'localaqui'</p>
    </div>
    <div class="Confirmation">
      <button data-label="Register" class="rainbow-hover">
        <a href="/dados"><span class="sp">Confirmar Presença</span></a>
      </button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import DadosComp from "../DadosComp.vue";

export default {
  name: "Birthday",
  components: {
    DadosComp,
  },
  data() {
    return {
      eventDetails: JSON.parse(localStorage.getItem("eventDetails")) || {},
      formattedDate: "",
    };
  },
  mounted() {
    console.log("Dados do evento carregados:", this.eventDetails);

    if (this.eventDetails.final_date) {
      const date = new Date(this.eventDetails.final_date);
      this.formattedDate = date.toLocaleDateString("pt-BR");

      console.log("Data formatada:", this.formattedDate);
    }
  },
};
</script>

<style scoped>
.invitation {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 50%;
  font-family: "Parisienne", cursive;
  text-align: center;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  background-image: url('@/assets/Background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.invitation-header h1 {
  font-size: 36px;
  color: #f39c12;
}

.invitation-header p {
  font-size: 18px;
  font-family: 'Poppins', sans-serif;






  color: #7f8c8d;
}

.location {
  margin-top: 100%;
  color: white;
}

/* From Uiverse.io by JkHuger */
.rainbow-hover {
  font-size: 15px;
  color: white;
  background-color: black;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 10px 70px;
  position: relative;
  line-height: 24px;
  border-radius: 15px;
  box-shadow: 0px 1px 2px #2B3044,
    0px 4px 16px #2B3044;
  transform-style: preserve-3d;
  transform: scale(var(--s, 1)) perspective(600px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
  perspective: 600px;
  transition: transform 0.1s;
}

.rainbow-hover:active {
  transition: 0.3s;
  transform: scale(0.93);
}

a {
  text-decoration: none;
  color: white;
}
</style>
