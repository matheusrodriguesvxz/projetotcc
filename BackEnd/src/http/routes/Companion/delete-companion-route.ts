import z from "zod";
import { app } from "../../server";
import { deleteGuest } from "../../../functions/Guests/delete-guest";
import { deleteCompanion } from "../../../functions/Companion/delete-Companion";

export const DeleteCompanion = async () => {
    app.delete(
        "/companion/:id",
        {
            schema: {
                params: z.object({
                    id: z.string(),
                }),
            },
        },
        async (request, reply) => {
            const { id } = request.params;
            const deletedGuest = await deleteCompanion(id);
            reply.send({
                message: "Deletado com Sucesso",
                data: deletedGuest
            }
            );
            return deletedGuest;

        },
    );
};
