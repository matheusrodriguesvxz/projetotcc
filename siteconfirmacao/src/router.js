import { createRouter, createWebHistory } from "vue-router";
import ConvitePage from "./components/Pages/ConvitePage.vue";
import DadosPage from "./components/Pages/DadosPage.vue";
import ConfirmadoPage from "./components/Pages/ConfirmadoPage.vue";
import QuePenaPage from "./components/Pages/QuePenaPage.vue";

const routes = [
    {
        path: "/convite",
        name: "Convite",
        component: ConvitePage
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