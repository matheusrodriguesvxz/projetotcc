import { createRouter, createWebHistory } from "vue-router";
import ConvitePage from "./components/Pages/ConvitePage.vue";
import DadosPage from "./components/Pages/DadosPage.vue";
import ConfirmadoPage from "./components/Pages/ConfirmadoPage.vue";
import QuePenaPage from "./components/Pages/QuePenaPage.vue";

const routes = [
    {
        path: "/",
        name: "Convite",
        components: ConvitePage
    },
    {
        path: "/dados",
        name: "Dados",
        components: DadosPage
    },
    {
        path: "/confirmado",
        name: "Conf",
        components: ConfirmadoPage
    },
    {
        path: "/quepena",
        name: "Pena",
        components: QuePenaPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;