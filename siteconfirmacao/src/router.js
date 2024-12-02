import { createRouter, createWebHistory } from "vue-router";
import DadosPage from "./components/Pages/DadosPage.vue";
import ConfirmadoPage from "./components/Pages/ConfirmadoPage.vue";
import QuePenaPage from "./components/Pages/QuePenaPage.vue";
import BirthdayPorra from "./components/Pages/BirthdayPorra.vue";
import PartyPage from "./components/Pages/PartyPage.vue";
import MarriagePage from "./components/Pages/MarriagePage.vue";
import TravelPage from "./components/Pages/TravelPage.vue";

const routes = [
  {
    path: "/event/:eventId",
    name: "Event",
    beforeEnter: async (to, from, next) => {
      const eventId = to.params.eventId;
      const apiUrl = `http://192.168.0.4:3333/events/${eventId}`;

      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Erro ao buscar dados do evento");
        }

        const data = await response.json();
        console.log(data[0]);

        if (Array.isArray(data) && data.length > 0) {
          const eventType = data[0].type;
          localStorage.setItem("eventDetails", JSON.stringify(data[0]));

          switch (eventType.toLowerCase()) {
            case "casamento":
              next({ path: "/marriage" });
              break;
            case "viagem":
              next({ path: "/travel"});
              break;
            case "aniversário":
              next({ path: "/birthday" });
              break;
            case "role / festas":
              next({ path: "/party" });
              break;
            default:
              next({ path: "/dados"});
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
    path: "/party",
    name: "Party",
    component: PartyPage,
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
    component: MarriagePage,
  },
  {
    path: "/travel",
    name: "Travel",
    component: TravelPage,
  },
  {
    path: "/birthday",
    name: "Birthday",
    component: BirthdayPorra,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
