import type { Events } from "../entity/Event";
import type { IBaseRepository } from "./IBaseRepository";

export class EventsRepository implements IBaseRepository<Events> {
	async create(event: Events): Promise<Events> {
		const response = await fetch("http://localhost:3333/event", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(event),
		});
		if (!response.ok) {
			throw new Error(`Erro na Requisição,status: ${response.status}`);
		}
		const createdEvent: Events = await response.json();
		return createdEvent;
	}
	async update(event: Events, id: string): Promise<Events> {
		const response = await fetch(`http://localhost:3333/event/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(event),
		});
		if (!response.ok) {
			throw new Error(`Erro na Requisição,status: ${response.status}`);
		}
		const updateEvent: Events = await response.json();
		return updateEvent;
	}
	async delete(id: string): Promise<Events | true> {
		const response = await fetch(`http://localhost:3333/event/${id}`, {
			method: "DELETE",
		});
		return response.status === 204 ? true : await response.json();
	}

	async getAll(): Promise<Events[]> {
		const response = await fetch("http://localhost:3333/event");

		const events: Events[] = await response.json();
		return events;
	}

	async getById(id: string): Promise<Events> {
		const response = await fetch(`http://localhost:3333/events/${id}`);
		const event: Events = await response.json();
		return event;
	}
}
