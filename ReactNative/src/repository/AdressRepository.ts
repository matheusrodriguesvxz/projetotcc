import type { Adress } from "../entity/Adress";
import type { IBaseRepository } from "./IBaseRepository";

export class AdressRepository implements IBaseRepository<Adress> {
	async create(adress: Adress): Promise<Adress> {
		const response = await fetch(
			"https://568d-2804-14d-78a6-830d-91e2-ccf4-7fa7-1e43.ngrok-free.app/adress",
			{
				method: "POST",
				headers: {
					"ngrok-skip-browser-warning": "true",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(adress),
			},
		);

		if (!response.ok) {
			throw new Error(`Erro na Requisição,status: ${response.status}`);
		}
		const creatdAdress: Adress = await response.json();
		return creatdAdress;
	}
	async update(adress: Adress, id: string): Promise<Adress> {
		const response = await fetch(`https://568d-2804-14d-78a6-830d-91e2-ccf4-7fa7-1e43.ngrok-free.app/adress/${id}`, {
			method: "PUT",
			headers: {
				"ngrok-skip-browser-warning": "true",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(adress),
		});
		if (!response.ok) {
			throw new Error(`Erro na Requisição,status: ${response.status}`);
		}
		const updatedAdress: Adress = await response.json();
		return updatedAdress;
	}
	async delete(id: string): Promise<true | Adress> {
		const response = await fetch(`https://568d-2804-14d-78a6-830d-91e2-ccf4-7fa7-1e43.ngrok-free.app/adress/${id}`, {
			headers: {
				"ngrok-skip-browser-warning": "true",
			},
			method: "DELETE",
		});
		if (!response.ok) {
			throw new Error(`Erro na Requisição,status: ${response.status}`);
		}
		return response.status === 204 ? true : await response.json();
	}
	async getAll(): Promise<Adress[]> {
		const response = await fetch("https://568d-2804-14d-78a6-830d-91e2-ccf4-7fa7-1e43.ngrok-free.app/adress", {
			headers: {
				"ngrok-skip-browser-warning": "true",
			},
		});
		if (!response.ok) {
			throw new Error(`Erro na Requisição,status: ${response.status}`);
		}
		const adresses: Adress[] = await response.json();
		return adresses;
	}
	async getById(id: string): Promise<Adress> {
		const response = await fetch(`https://568d-2804-14d-78a6-830d-91e2-ccf4-7fa7-1e43.ngrok-free.app/adress/${id}`, {
			headers: {
				"ngrok-skip-browser-warning": "true",
			},
		});
		if (!response.ok) {
			throw new Error(`Erro na Requisição,status: ${response.status}`);
		}
		const adress: Adress = await response.json();
		return adress;
	}
}
