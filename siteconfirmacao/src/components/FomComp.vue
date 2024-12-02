<template>
  <form v-for="(form, index) in lista" :key="index" @submit.prevent="true">
    <p v-if="index > 0" class="acomp-text">Preencha os dados do acompanhante:</p>

    <input type="text" v-model="form.name" placeholder="Nome"><br>
    <input type="number" v-model="form.age" placeholder="Idade"><br>
    <input type="text" v-model="form.contact" placeholder="Número de celular"><br>
    <select v-model="form.sexy" name="sexo" required>
      <option value="" disabled selected>Sexo</option>
      <option value="F">Feminino</option>
      <option value="M">Masculino</option>
    </select><br>
  </form>

  <div class="buttonsGuests">
    <button class="acomp" @click="adicionarAcompanhante">+Adicionar acompanhante</button>
    <button class="acomp" @click="removerAcompanhante" :disabled="lista.length <= 1">-Remover acompanhante</button>
  </div>

  <button class="envio" @click="enviarDados">Enviar</button>
</template>

<script>
export default {
  name: "FormComp",
  data() {
    return {
      eventDetails: JSON.parse(localStorage.getItem("eventDetails")) || {},
      lista: [
        { name: "", age: null, contact: "", sexy: "" }
      ],
      apiResponse: "",
      jsonToSend: "",
    };
  },
  methods: {
    adicionarAcompanhante() {
      this.lista.push({ name: "", age: null, contact: "", sexy: "" });
    },
    removerAcompanhante() {
      if (this.lista.length > 1) {
        this.lista.pop();
      }
    },
    async enviarDados() {


      const apiUrlEvent = `https://5615-2804-14d-78a6-830d-91e2-ccf4-7fa7-1e43.ngrok-free.app/events/${this.eventDetails.id}`;
      const apiUrlGuest = "https://5615-2804-14d-78a6-830d-91e2-ccf4-7fa7-1e43.ngrok-free.app/guest";
      const apiUrlCompanion = "https://5615-2804-14d-78a6-830d-91e2-ccf4-7fa7-1e43.ngrok-free.app/companion";
      const apiUrlGuestAndEvent = "https://5615-2804-14d-78a6-830d-91e2-ccf4-7fa7-1e43.ngrok-free.app/eventAndGuests";

      if (this.lista.some((guest) => !guest.name || !guest.age || !guest.contact || !guest.sexy)) {
        alert("Por favor, preencha todos os campos antes de enviar.");
        return;
      }

      try {
        // Obter o userID do evento
        const responseEvent = await fetch(apiUrlEvent, {
          headers: {
            'ngrok-skip-browser-warning': 'true',
            "Content-Type": "application/json",
          },
        });
        if (!responseEvent.ok) {
          throw new Error("Erro ao buscar o userID do evento.");
        }
        console.log("responseEvent", responseEvent);
        const eventData = await responseEvent.json();
        const userID = eventData[0]?.userID;

        if (!userID) {
          throw new Error("userID não encontrado na resposta da API.");
        }
        const guestData = {
          name: this.lista[0].name,
          age: this.lista[0].age,
          contact: this.lista[0].contact,
          sexy: this.lista[0].sexy,
          userID: userID,
        };

        const responseGuest = await fetch(apiUrlGuest, {
          method: "POST",
          headers: {
            'ngrok-skip-browser-warning': 'true',
            "Content-Type": "application/json",
          },
          body: JSON.stringify(guestData),
        });

        if (!responseGuest.ok) {
          throw new Error("Erro ao enviar os dados para a tabela Guest.");
        }

        const guestResponseData = await responseGuest.json();
        const guestID = guestResponseData.id;
        console.log("Guest adicionado:", guestID);
        const eventAndGuestsData = {
          id_guests: guestID,
          userID: userID,
          id_events: eventData[0].id,
        };
        console.log("eventAndGuestsData", eventAndGuestsData);

        const responseGuestAndEvent = await fetch(apiUrlGuestAndEvent, {
          method: "POST",
          headers: {
            'ngrok-skip-browser-warning': 'true',
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventAndGuestsData),
        });
        const companions = this.lista.slice(1);
        for (const companion of companions) {
          const companionData = {
            name: companion.name,
            age: companion.age,
            contact: companion.contact,
            sexy: companion.sexy,
            id_guest: guestID,

          };

          const responseCompanion = await fetch(apiUrlCompanion, {
            method: "POST",
            headers: {
              'ngrok-skip-browser-warning': 'true',
               "Content-Type": "application/json",
            },
            body: JSON.stringify(companionData),
          });

          if (!responseCompanion.ok) {
            throw new Error(`Erro ao enviar acompanhante: ${companion.name}`);
          }

          const companionResponse = await responseCompanion.json();
          console.log("Companion adicionado:", companionResponse);
        }


        if (!responseGuestAndEvent.ok) {
          throw new Error("Erro ao enviar os dados para a tabela EventAndGuests.");
        }

        alert("Dados enviados com sucesso!");
      } catch (error) {
        console.error("Erro na comunicação com a API:", error);
        alert("Erro ao enviar os dados. Verifique sua conexão.");
      }
    },
  },
}
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

input[type=text],
input[type=number],
select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: #760BFF;
  border-bottom: 2px solid #760BFF;
}

select:invalid {
  color: gray;
}

label {
  font-family: "Poppins", sans-serif;
  margin-top: 10px;
}

.buttonsGuests {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  width: 100%;
  text-align: center;
  gap: 8px;
}

.envio {
  width: 150px;
  height: 40px;
  background-color: #760BFF;
  border-radius: 30px;
  color: white;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 9%;
  display: block;
  margin-left: auto;
  margin-right: auto;
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

.acomp-text {
  text-align: center;
  margin-bottom: 10px;
  font-size: 16px;
  color: #760BFF;
  font-family: "Poppins", sans-serif;
}
</style>
