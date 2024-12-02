<template>
    <div class="invitation">
      <div class="invitation-header">
        <h1>{{ eventDetails.name }}</h1>
        <h2>Convite</h2>
        <p>É com muito prazer que te convido para minha cerimonia de casamento! Conto com você!</p>
      </div>
      
      <div class="Confirmation">
        <div class="location">
          <p><strong>Local:</strong> {{ eventDetails.street }}</p>
        </div>
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
  
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;  
  }
  
  .invitation {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    font-family: "Parisienne", cursive;
    text-align: center;
    background-image: url('@/assets/Casamento.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  
  .invitation-header h1 {
    margin-top: 30%;
    font-size: 2rem;
    color: white;
    margin-bottom: 10px;
  }
  
  .invitation-header h2 {
    font-size: 1.5rem;
    color: white;
    margin-bottom: 10px;
  }
  
  .invitation-header p {
    font-size: 1rem;
    font-family: 'Poppins', sans-serif;
    color: #7f8c8d;
    margin-bottom: 20px;
  }
  
  .location {
    color: white;
    margin-bottom: 40px;
  }
  
  .Confirmation {
    margin-top: auto;
    margin-bottom: 20px;
  }
  
  .rainbow-hover {
    font-size: 1rem;
    color: white;
    background-color: black;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 12px 50px;
    position: relative;
    line-height: 24px;
    border-radius: 15px;
    box-shadow: 0px 1px 2px #2B3044, 0px 4px 16px #2B3044;
    transform-style: preserve-3d;
    transition: transform 0.1s, box-shadow 0.2s;
  }
  
  .rainbow-hover:active {
    transform: scale(0.93);
    box-shadow: 0px 1px 3px #2B3044, 0px 5px 18px #2B3044;
  }
  
  a {
    text-decoration: none;
    color: white;
  }
  
  @media (max-width: 600px) {
    .invitation-header h1 {
      font-size: 1.5rem;
    }
  
    .invitation-header h2 {
      font-size: 1.2rem;
    }
  
    .invitation-header p {
      font-size: 0.9rem;
    }
  
    .rainbow-hover {
      font-size: 0.9rem;
      padding: 12px 40px;
    }
  }
  </style>
  