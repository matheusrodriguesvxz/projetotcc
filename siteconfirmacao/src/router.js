import { createRouter, createWebHistory } from "vue-router";
import ConvitePartyPage from "./components/Pages/ConvitePartyPage.vue";
import DadosPage from "./components/Pages/DadosPage.vue";
import ConfirmadoPage from "./components/Pages/ConfirmadoPage.vue";
import QuePenaPage from "./components/Pages/QuePenaPage.vue";

const routes = [
    {
        path: "/",
        name: "Convite",
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
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;