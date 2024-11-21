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
      lista: [{ name: "", age: null, contact: "", sexy: "F" }],
    };
  },
  methods: {
    adicionarAcompanhante() {
      this.lista.push({ name: "", age: null, contact: "", sexy: "F" });
    },
    async enviarDados() {
      const apiUrlEvent = "http://127.0.0.1:3333/events/v2q2yosrjo7ielyktwgqwbvr";
      const apiUrlGuest = "http://127.0.0.1:3333/guest";
      const apiUrlCompanion = "http://192.168.0.4:3333/companion";
      const apiUrlGuestAndEvent = "http://192.168.0.4:3333/eventAndGuests";

      if (this.lista.some((guest) => !guest.name || !guest.age || !guest.contact || !guest.sexy)) {
        alert("Por favor, preencha todos os campos antes de enviar.");
        return;
      }

      try {
        // Obter o userID do evento
        const responseEvent = await fetch(apiUrlEvent);
        if (!responseEvent.ok) {
          throw new Error("Erro ao buscar o userID do evento.");
        }
        console.log("responseEvent", responseEvent);
        const eventData = await responseEvent.json();
        const userID = eventData[0]?.userID;

        if (!userID) {
          throw new Error("userID não encontrado na resposta da API.");
        }

        // Enviar o primeiro formulário para a tabela Guest
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
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

input,
select {
  margin-top: 15px;
  width: 100%;
  max-width: 300px;
  border: 1px solid #760BFF;
  border-radius: 5px;
  padding: 8px;
  font-family: "Poppins", sans-serif;
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