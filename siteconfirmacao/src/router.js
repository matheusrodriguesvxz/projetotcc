import { createRouter, createWebHistory } from "vue-router";

import DadosPage from "./components/Pages/DadosPage.vue";
import ConfirmadoPage from "./components/Pages/ConfirmadoPage.vue";
import QuePenaPage from "./components/Pages/QuePenaPage.vue";
import Married from "./components/Pages/Marriedssssssssssss.vue";
import BirthdayPorra from "./components/Pages/BirthdayPorra.vue";
import PartyPorra from "./components/Pages/PartyPorra.vue";

const routes = [
  {
    path: "/event/:eventId",
    name: "Event",
    beforeEnter: async (to, from, next) => {
      const eventId = to.params.eventId;
      const apiUrl = `https://8fc8-2804-14d-78a6-830d-7890-d55c-4eaf-5d3f.ngrok-free.app/events/${eventId}`;

      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "ngrok-skip-browser-warning": "true",
            'Content-Type': 'application/json'

          }

        });
        if (!response.ok) {
          throw new Error("Erro ao buscar dados do evento");
        }

        const data = await response.json();
        console.log(data[0])

        if (Array.isArray(data) && data.length > 0) {
          const eventType = data[0].type;
          const eventDetails = {
            id: data[0].id,
            name: data[0].name,
            date: data[0].date,
            type: data[0].type,
          };

          localStorage.setItem("eventDetails", JSON.stringify(data[0]));

          switch (eventType.toLowerCase()) {
            case "casamento":
              next({ path: "/marriage" });
              break;
            case "viagem":
              next({ path: "/travel", state: eventDetails });
              break;
            case "aniversário":
              next({ path: "/birthday" });
              break;
            case "role / festas":
              next({ path: "/party" });
              break;
            default:
              next({ path: "/dados", state: eventDetails });
              break;
          }
        } else {
          console.error("Resposta da API inválida ou vazia.");
          next("/dados");
        }
      } catch (error) {
        console.error("Erro ao chamar a API:", error);
        next("/dados");
      }
    },
  },
  {
    path: "/dados",
    name: "Dados",
    component: DadosPage,
  },
  {
    path: "/confirmado",
    name: "Conf",
    component: ConfirmadoPage,
  },
  {
    path: "/quepena",
    name: "Pena",
    component: QuePenaPage,
  },
  {
    path: "/marriage",
    name: "Marriage",
    component: Married,
  },
  // {
  //     path: "/travel",
  //     name: "Travel",
  //     component: TravelPage,
  // },
  {
    path: "/birthday",
    name: "Birthday",
    component: BirthdayPorra,
  },
  {
    path: "/party",
    name: "Party",
    component: PartyPorra,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
