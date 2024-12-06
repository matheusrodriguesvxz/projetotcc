import type { Kitty } from "../entity/Kitty";
import type { IBaseRepository } from "./IBaseRepository";

export class KittyRepository implements IBaseRepository<Kitty> {
	async create(kitty: Kitty): Promise<Kitty> {
		const response = await fetch(
			"http://192.168.1.52:3333/Kitty",
			{
				method: "POST",
				headers: {
					"ngrok-skip-browser-warning": "true",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(kitty),
			},
		);
		if (!response.ok) {
			throw new Error("Failed to create Kitty");
		}
		const createdKitty: Kitty = await response.json();
		return createdKitty;
	}
	async update(kitty: Kitty, id: string): Promise<Kitty> {
		const response = await fetch(
			`http://192.168.1.52:3333/Kitty/${id}`,
			{
				method: "PUT",
				headers: {
					"ngrok-skip-browser-warning": "true",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(kitty),
			},
		);

		if (!response.ok) {
			throw new Error("Failed to update Kitty");
		}
		const updatedKitty: Kitty = await response.json();
		return updatedKitty;
	}
	async delete(id: string): Promise<true | Kitty> {
		const response = await fetch(
			`http://192.168.1.52:3333/Kitty/${id}`,
			{
				method: "DELETE",
				headers: {
					"ngrok-skip-browser-warning": "true",
				},
			},
		);
		if (!response.ok) {
			throw new Error("Failed to delete Kitty");
		}
		return response.status === 204 ? true : await response.json();
	}
	async getAll(): Promise<Kitty[]> {
		const response = await fetch(
			"http://192.168.1.52:3333/Kittys",
			{
				headers: {
					"ngrok-skip-browser-warning": "true",
				},
			},
		);
		const Kittys: Kitty[] = await response.json();
		return Kittys;
	}
	async getById(id: string): Promise<Kitty> {
		const response = await fetch(
			`http://192.168.1.52:3333/Kitty/${id}`,
			{
				headers: {
					"ngrok-skip-browser-warning": "true",
				},
			},
		);
		const Kitty: Kitty = await response.json();
		return Kitty;
	}
}

