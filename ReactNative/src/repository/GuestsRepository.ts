import type { Guests } from "../entity/Guests";
import type { IBaseRepository } from "./IBaseRepository";

export class GuestsRepository implements IBaseRepository<Guests> {
	async create(guest: Guests): Promise<Guests> {
		const response = await fetch("http://localhost:3333/guest", {
			method: "POST",
			headers: {
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
		const response = await fetch(`http://localhost:3333/guest/${id}`, {
			method: "PUT",
			headers: {
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
		const response = await fetch(`http://localhost:3333/guest/${id}`, {
			method: "DELETE",
		});

		if (!response.ok) {
			throw new Error(`Erro na Requisição,status: ${response.status}`);
		}

		return response.status === 204 ? true : await response.json();
	}
	async getAll(): Promise<Guests[]> {
		const response = await fetch("http://localhost:3333/guests");
		if (!response.ok) {
			throw new Error(`Erro na Requisição,status: ${response.status}`);
		}
		const guests: Guests[] = await response.json();
		return guests;
	}
	async getById(id: string): Promise<Guests> {
		const response = await fetch(`http://localhost:3333/guest/${id}`);
		if (!response.ok) {
			throw new Error(`Erro na Requisição,status: ${response.status}`);
		}
		const guest: Guests = await response.json();
		return guest;
	}
}
