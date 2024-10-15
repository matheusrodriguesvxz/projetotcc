import fastify from "fastify";
import { getEvents } from "./routes/Events/get-all-events";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { createEvent } from "./routes/Events/create-event";
import { updateEvent } from "./routes/Events/update-event";
import { DeleteEvent } from "./routes/Events/delete-events";
import { getGuests } from "./routes/Guests/get-all-guests-route";
import { createsGuest } from "./routes/Guests/create-guests-route";
import { updatesGuests } from "./routes/Guests/update-guest-route";
import { DeleteGuests } from "./routes/Guests/delete-guest-route";
import { getKittys } from "./routes/Kitty/get-all-kittys-route";
import { createKittys } from "./routes/Kitty/create-kitty-route";
import { updatesKitty } from "./routes/Kitty/update-kitty-route";
import { DeleteKitty } from "./routes/Kitty/delete-kitty-router";
import { getTokenSpotifyy } from "./routes/SpotifyToken/token_permission";
import { getBuyLists } from "./routes/BuyList/get-all-buyList-route";
import { createBuyLists } from "./routes/BuyList/create-buyList-route";
import { updateBuyLists } from "./routes/BuyList/update-buyList-route";
import { deleteBuyLists } from "./routes/BuyList/delete-buyList";
import { createdAdress } from "./routes/Adress/create-adress-router";
import { getAdress } from "./routes/Adress/get-all-adress-route";
import { updatesAdress } from "./routes/Adress/update-adress-route";
import deletesAdress from "./routes/Adress/delete-adress-route";
export const app = fastify().withTypeProvider<ZodTypeProvider>();
app.listen({ port: 3333, host: "0.0.0.0" }, (err, address) => {
	if (err) {
		console.error("Erro ao iniciar o servidor:", err);
		process.exit(1);
	}
	console.log(`Servidor HTTP rodando em ${address}`);
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

//Adress / Endereços
app.register(getAdress);
app.register(createdAdress);
app.register(updatesAdress);
app.register(deletesAdress);



// Events / Eventos
app.register(getEvents);
app.register(createEvent);
app.register(updateEvent);
app.register(DeleteEvent);

// Guests / Convidados
app.register(getGuests);
app.register(createsGuest);
app.register(updatesGuests);
app.register(DeleteGuests);

// Kitts / Vaquinha
app.register(getKittys);
app.register(createKittys);
app.register(updatesKitty);
app.register(DeleteKitty);

//BuyList / Lista de Compras
app.register(getBuyLists);
app.register(createBuyLists);
app.register(updateBuyLists);
app.register(deleteBuyLists);

//Spotify
app.register(getTokenSpotifyy);
