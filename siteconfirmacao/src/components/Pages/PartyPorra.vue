<template>
  <div class="invitation">
    <div class="invitation-header">
      <h1>Você está convidado para a festa!</h1>
      <p>Vai ser uma noite incrível e adoramos ter você com a gente nesse evento especial:</p>
    </div>

    <div class="event-details">
      <p><strong>Evento:</strong> {{ eventDetails.name }}</p>
      <p><strong>Data:</strong> {{ formattedDate }}</p>
      <p><strong>Local:</strong> {{ eventDetails.street }}</p>
      <p><strong>Horário:</strong> 22:00</p>
    </div>

    <div class="invitation-body">
      <p>Prepare-se para muita diversão, música e boa companhia!</p>
      <p>
        Confirme sua presença para garantir seu lugar na festa mais animada do ano!
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
  name: "Party",
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
  font-family: "Poppins", sans-serif;
  text-align: center;
  border: 2px solid #8e44ad; /* Roxo vibrante */
  border-radius: 15px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  background: linear-gradient(135deg, #9b59b6, #f39c12); /* Roxo para amarelo */
}

.invitation-header {
  margin-bottom: 25px;
}

.invitation-header h1 {
  font-size: 34px;
  color: #fff;
  font-weight: bold;
}

.invitation-header p {
  font-size: 18px;
  color: #fff;
  font-style: italic;
}

.event-details {
  margin: 20px 0;
  text-align: left;
  padding: 15px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
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
  color: #fff;
  line-height: 1.6;
  font-weight: bold;
}

.confirmation-section {
  margin-top: 25px;
}

.confirmation-section h3 {
  font-size: 20px;
  color: #e74c3c;
  font-weight: bold;
}

.confirmation-section p {
  font-size: 16px;
  color: #fff;
}
</style>
