<template>
    <form v-for="(form, index) in lista" :key="index" @submit.prevent="true">
      <input type="text" v-model="form.name" placeholder="Nome"><br>
      <input type="number" v-model="form.age" placeholder="Idade"><br>
      <input type="text" v-model="form.contact" placeholder="Número de celular"><br>
      <label>Sexo: </label>
      <select v-model="form.sexy" name="sexo">
        <option value="F">Feminino</option>
        <option value="M">Masculino</option>
      </select><br>
    </form>
 
    <div class="buttonsGuests">
      <button class="acomp" @click="adicionarAcompanhante">+Adicionar acompanhante</button>
      <button class="envio" @click="enviarDados">Enviar</button>
    </div>
  </template>
  
  <script>
  export default {
    name: "FormComp",
    data() {
      return {
            lista: [
              { name: "", age: null, contact: "", sexy: "F" }
            ],
            apiResponse: "",
            jsonToSend: "", 
          };
      
    },
    methods: {
      adicionarAcompanhante() {
        this.lista.push({ name: "", age: null, contact: "", sexy: "F" });
      },
      async enviarDados() {
        const apiUrlEvent = "http://127.0.0.1:3333/events/fstt8mhvifucax0krvqd05mz";
        const apiUrlGuest = "http://127.0.0.1:3333/guest";
  
        
        if ( this.lista.some(guest => !guest.name || !guest.age || !guest.contact || !guest.sexy)) {
          alert("Por favor, preencha todos os campos antes de enviar.");
          return;
        }
  
        try {
          const responseEvent = await fetch(apiUrlEvent);
  
          if (!responseEvent.ok) {
            throw new Error("Erro ao buscar o userID do evento.");
          }
  
          const eventData = await responseEvent.json();
          const userID = eventData[0].userID;
  
          if (!userID) {
            throw new Error("userID não encontrado na resposta da API.");
          }
  
          this.apiResponse = `userID: ${userID}`;
  
          
          const guestsWithUserID = this.lista.map(guest => ({
            name: guest.name,
            age: guest.age,
            contact: guest.contact,
            sexy: guest.sexy,
            userID: userID,
          }));
          
          
          this.jsonToSend = JSON.stringify(guestsWithUserID[0], null, 2);
          console.log("JSON a ser enviado:", this.jsonToSend);
          console.log("Dados a serem enviados:", guestsWithUserID);

          class Guest {
            constructor(name, age, contact, sexy, userID) {
              this.name = name;
              this.age = age;
              this.contact = contact;
              this.sexy = sexy;
              this.userID = userID;
            }
          }

          const guest1 = new Guest(guestsWithUserID[0].name, guestsWithUserID[0].age, guestsWithUserID[0].contact, guestsWithUserID[0].sexy, userID);
          const responseGuest = await fetch(apiUrlGuest, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(guest1),
          });
  
          const data = await responseGuest.json();
          if (responseGuest.ok) {
            console.log("Dados enviados:", data);
            alert("Convidados adicionados com sucesso!");
          } else {
            console.error("Erro ao enviar os dados:", responseGuest.statusText);
            alert("Erro ao enviar os dados.");
          }
        } catch (error) {
          console.error("Erro na comunicação com a API:", error);
          alert("Erro ao enviar os dados. Verifique sua conexão.");
        }
      }
    },
  };
  </script>
  
  <style scoped>
  * {
    box-sizing: border-box;
  }
  
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 10px;
  }
 
  input[type=text] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: #760BFF;
  border-bottom: 2px solid #760BFF;
}
  
  input[type=number] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: #760BFF;
  border-bottom: 2px solid #760BFF;
}
  
  label {
    font-family: "Poppins", sans-serif;
    margin-top: 10px;
  }
  
  .buttonsGuests {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  
  .envio {
    width: 100px;
    height: 40px;
    background-color: #760BFF;
    border-radius: 30px;
    color: white;
    font-family: "Poppins", sans-serif;
    font-weight: 700;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .envio:hover {
    background-color: #5a0d8a;
  }
  
  .acomp {
    width: 200px;
    height: 40px;
    background-color: #fff;
    border: 1px solid #760BFF;
    border-radius: 30px;
    color: #760BFF;
    font-family: "Poppins", sans-serif;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  
  .acomp:hover {
    background-color: #760BFF;
    color: white;
  }
  </style>
  