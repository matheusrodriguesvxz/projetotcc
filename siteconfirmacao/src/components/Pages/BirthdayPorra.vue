<template>
  <div class="invitation">
    <div class="invitation-header">
      <h1>Feliz Aniversário!</h1>
      <p>É com muita alegria que convidamos você para comemorar o nosso dia especial:</p>
    </div>

    <div class="event-details">
      <p><strong>Evento:</strong> {{ eventDetails.name }}</p>
      <p><strong>Data:</strong> {{ formattedDate }}</p>
      <p><strong>Local:</strong> {{ eventDetails.street }}</p>
      <p><strong>Horário:</strong> 18:00</p>
    </div>

    <div class="invitation-body">
      <p>Estamos ansiosos para celebrar este momento maravilhoso com você!</p>
      <p>
        Por favor, confirme sua presença para que possamos organizar tudo com carinho.
      </p>
    </div>

    <div class="confirmation-section">
      <DadosComp />
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
    // Log para verificar os dados carregados
    console.log("Dados do evento carregados:", this.eventDetails);
    
    if (this.eventDetails.final_date) {
      const date = new Date(this.eventDetails.final_date);
      this.formattedDate = date.toLocaleDateString("pt-BR");
      
      // Log para verificar a data formatada
      console.log("Data formatada:", this.formattedDate);
    }
  },
};
</script>

<style scoped>
.invitation {
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
  font-family: "Arial", sans-serif;
  text-align: center;
  border: 1px solid #f1c40f;
  border-radius: 20px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  background: linear-gradient(135deg, #fbc2eb, #a6c1ee);
}

.invitation-header {
  margin-bottom: 30px;
}

.invitation-header h1 {
  font-size: 36px;
  color: #f39c12;
  font-weight: bold;
}

.invitation-header p {
  font-size: 18px;
  color: #7f8c8d;
}

.event-details {
  margin: 20px 0;
  text-align: left;
  padding: 15px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.1);
}

.event-details p {
  font-size: 18px;
  margin: 10px 0;
  color: #2c3e50;
}

.invitation-body {
  margin: 20px 0;
}

.invitation-body p {
  font-size: 16px;
  color: #7f8c8d;
  line-height: 1.6;
}

.confirmation-section {
  margin-top: 30px;
}

.confirmation-section h3 {
  font-size: 20px;
  color: #f39c12;
  font-weight: bold;
}

.confirmation-section p {
  font-size: 16px;
  color: #7f8c8d;
}
</style>
