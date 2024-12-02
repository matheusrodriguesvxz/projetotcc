import type { Guests } from "../entity/Guests";
import type { IBaseRepository } from "./IBaseRepository";

export class GuestsRepository implements IBaseRepository<Guests> {
	async create(guest: Guests): Promise<Guests> {
		const response = await fetch("https://568d-2804-14d-78a6-830d-91e2-ccf4-7fa7-1e43.ngrok-free.app/guest", {
			method: "POST",
			headers: {
				"ngrok-skip-browser-warning": "true",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(guest),
		});
		if (!response.ok) {
			throw new Error(`Erro na Requisição,status: ${response.status}`);
		}
		const guestsCreated: Guests = await response.json();
		return guestsCreated;
	}
	async update(guest: Guests, id: string): Promise<Guests> {
		const response = await fetch(`https://568d-2804-14d-78a6-830d-91e2-ccf4-7fa7-1e43.ngrok-free.app/guest/${id}`, {
			method: "PUT",
			headers: {
				"ngrok-skip-browser-warning": "true",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(guest),
		});

		if (!response.ok) {
			throw new Error(`Erro na Requisição,status: ${response.status}`);
		}
		const updateGuest: Guests = await response.json();
		return updateGuest;
	}
	async delete(id: string): Promise<true | Guests> {
		const response = await fetch(`https://568d-2804-14d-78a6-830d-91e2-ccf4-7fa7-1e43.ngrok-free.app/guest/${id}`, {
			method: "DELETE",
			headers: {
				"ngrok-skip-browser-warning": "true",
			},
		});

		if (!response.ok) {
			throw new Error(`Erro na Requisição,status: ${response.status}`);
		}

		return response.status === 204 ? true : await response.json();
	}
	async getAll(): Promise<Guests[]> {
		const response = await fetch("https://568d-2804-14d-78a6-830d-91e2-ccf4-7fa7-1e43.ngrok-free.app/guests", {
			headers: {
				"ngrok-skip-browser-warning": "true",
			},
		});
		if (!response.ok) {
			throw new Error(`Erro na Requisição,status: ${response.status}`);
		}
		const guests: Guests[] = await response.json();
		return guests;
	}
	async getById(id: string): Promise<Guests> {
		const response = await fetch(`https://568d-2804-14d-78a6-830d-91e2-ccf4-7fa7-1e43.ngrok-free.app/guest/${id}`, {
			headers: {
				"ngrok-skip-browser-warning": "true",
			},
		});
		if (!response.ok) {
			throw new Error(`Erro na Requisição,status: ${response.status}`);
		}
		const guest: Guests = await response.json();
		return guest;
	}
}
