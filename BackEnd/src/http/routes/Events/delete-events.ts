import z from "zod";
import { app } from "../../server";
import deleteEvent from "../../../functions/Events/delete-events";

export const DeleteEvent = async () => {
	app.delete(
		"/deleteEvent/:id",
		{
			schema: {
				params: z.object({
					id: z.string(),
				}),
			},
		},
		async request => {
			const { id } = request.params;
			const deletedEvent = await deleteEvent(id);
      return deletedEvent;
		},
	);
};
