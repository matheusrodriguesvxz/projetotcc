import type { Events } from "../entity/Event";
import type { EventAndGuests } from "../entity/EventAndGuests";
import type { IBaseRepository } from "./IBaseRepository";

export class EventAndGuestsRepository
	implements IBaseRepository<EventAndGuests>
{
	async create(event: EventAndGuests): Promise<EventAndGuests> {
		const response = await fetch(
			"https://568d-2804-14d-78a6-830d-91e2-ccf4-7fa7-1e43.ngrok-free.app/eventAndGuests",
			{
				method: "POST",
				headers: {
					"ngrok-skip-browser-warning": "true",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(event),
			},
		);
		if (!response.ok) {
			throw new Error(`Erro na Requisição,status: ${response.status}`);
		}
		const createdEvent: EventAndGuests = await response.json();
		return createdEvent;
	}
	async update(event: EventAndGuests, id: string): Promise<EventAndGuests> {
		const response = await fetch(
			`https://568d-2804-14d-78a6-830d-91e2-ccf4-7fa7-1e43.ngrok-free.app/event/${id}`,
			{
				method: "PUT",
				headers: {
					"ngrok-skip-browser-warning": "true",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(event),
			},
		);
		if (!response.ok) {
			throw new Error(`Erro na Requisição,status: ${response.status}`);
		}
		const updateEvent: EventAndGuests = await response.json();
		return updateEvent;
	}
	async delete(id: string): Promise<EventAndGuests | true> {
		const response = await fetch(
			`https://568d-2804-14d-78a6-830d-91e2-ccf4-7fa7-1e43.ngrok-free.app/event/${id}`,
			{
				method: "DELETE",
				headers: {
					"ngrok-skip-browser-warning": "true",
				},
			},
		);
		return response.status === 204 ? true : await response.json();
	}

	async getAll(): Promise<EventAndGuests[]> {
		const response = await fetch(
			"https://568d-2804-14d-78a6-830d-91e2-ccf4-7fa7-1e43.ngrok-free.app/eventsAndGuests",
			{
				headers: {
					"ngrok-skip-browser-warning": "true",
				},
			},
		);

		const events: EventAndGuests[] = await response.json();
		return events;
	}

	async getById(id: string): Promise<EventAndGuests> {
		const response = await fetch(
			`https://568d-2804-14d-78a6-830d-91e2-ccf4-7fa7-1e43.ngrok-free.app/eventsAndGuests/${id}`,{
			headers: {
				"ngrok-skip-browser-warning": "true",
			},
			});
		const event: EventAndGuests = await response.json();
		return event;
	}
}
