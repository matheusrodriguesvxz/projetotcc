
<template>
  <div class="invitation">
    <div class="invitation-header">
      <h1>Você está convidado!</h1>
      <p>É com muita alegria que convidamos você para o nosso evento especial:</p>
    </div>
    
    <div class="event-details">
      <p><strong>Evento:</strong> {{ eventDetails.name }}</p>
      <p><strong>Data:</strong> {{formattedDate }}</p>
      <p><strong>Local:</strong> {{ eventDetails.street }} {{ eventDetails.neighborhood }}</p>
      <p><strong>Horário:</strong> 18:00</p>
    </div>

    <div class="invitation-body">
      <p>Venha celebrar este momento inesquecível conosco!</p>
      <p>
        Por favor, confirme sua presença para garantirmos uma experiência perfeita para você.
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
  name: "Married",
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
  padding: 20px;
  font-family: "Poppins", sans-serif;
  text-align: center;
  border: 1px solid #ffcccb;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #fff5f5, #ffe6e6);
}

.invitation-header {
  margin-bottom: 20px;
}

.invitation-header h1 {
  font-size: 28px;
  color: #ff6b6b;
}

.invitation-header p {
  font-size: 16px;
  color: #555;
}

.event-details {
  margin: 20px 0;
  text-align: left;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.event-details p {
  font-size: 16px;
  margin: 5px 0;
  color: black;
}

.invitation-body {
  margin: 20px 0;
}

.invitation-body p {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.confirmation-section {
  margin-top: 20px;
}

.confirmation-section h3 {
  font-size: 18px;
  color: #ff6b6b;
}

.confirmation-section p {
  font-size: 14px;
  color: #666;
}
</style>
