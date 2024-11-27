import { createRouter, createWebHistory } from "vue-router";

import ConvitePartyPage from "./components/Pages/ConvitePartyPage.vue";
import DadosPage from "./components/Pages/DadosPage.vue";
import ConfirmadoPage from "./components/Pages/ConfirmadoPage.vue";
import QuePenaPage from "./components/Pages/QuePenaPage.vue";
import BirthdayPorra from "./components/Pages/BirthdayPorra.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        beforeEnter: async (to, from, next) => {
            // const eventId = to.params.eventId;
            // const apiUrl = `http://127.0.0.1:3333/events/${eventId}`;
            const apiUrl = "http://127.0.0.1:3333/events/fstt8mhvifucax0krvqd05mz";

            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error("Erro ao buscar dados da API");
                }

                const data = await response.json();

                if (Array.isArray(data) && data.length > 0) {
                    const eventType = data[0].type;

                    switch (eventType.toLowerCase()) {
                        case "casamento":
                            next("/marriage");
                            break;
                        case "viagem":
                            next("/travel");
                            break;
                        case "aniversario":
                            next("/birthday");
                            break;
                        case "role":
                            next("/party");
                            break;
                        default:
                            next("/quepena");
                            break;
                    }
                } else {
                    console.error("Resposta da API inválida ou vazia.");
                    next("/quepena");
                }
            } catch (error) {
                console.error("Erro ao chamar a API:", error);
                next("/quepena");
            }
        }
    },
    {
        path: "/party",
        name: "Party",
        component: ConvitePartyPage
    },
    {
        path: "/dados",
        name: "Dados",
        component: DadosPage
    },
    {
        path: "/confirmado",
        name: "Conf",
        component: ConfirmadoPage
    },
    {
        path: "/quepena",
        name: "Pena",
        component: QuePenaPage
    },
    // {
    //     path: "/marriage",
    //     name: "Marriage",
    //     component: () => import("./components/Pages/MarriagePage.vue") // Carregamento dinâmico
    // },
    // {
    //     path: "/travel",
    //     name: "Travel",
    //     component: () => import("./components/Pages/TravelPage.vue") // Carregamento dinâmico
    // },
    {
        path: "/birthday",
        name: "Birthday",
        component: BirthdayPorra // Carregamento dinâmico
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
