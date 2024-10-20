import type { Kitty } from "../entity/Kitty";
import type { IBaseRepository } from "./IBaseRepository";

export class KittyRepository implements IBaseRepository<Kitty> {
	async create(kitty: Kitty): Promise<Kitty> {
		const response = await fetch("localhost:3333/Kitty", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(kitty),
		});
		if (!response.ok) {
			throw new Error("Failed to create Kitty");
		}
		const createdKitty: Kitty = await response.json();
		return createdKitty;
	}
	async update(kitty: Kitty, id: string): Promise<Kitty> {
		const response = await fetch(`localhost:3333/Kitty/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(kitty),
		});

		if (!response.ok) {
			throw new Error("Failed to update Kitty");
		}
		const updatedKitty: Kitty = await response.json();
		return updatedKitty;
	}
	async delete(id: string): Promise<true | Kitty> {
		const response = await fetch(`localhost:3333/Kitty/${id}`, {
			method: "DELETE",
		});
		if (!response.ok) {
			throw new Error("Failed to delete Kitty");
		}
		return response.status === 204 ? true : await response.json();
	}
	async getAll(): Promise<Kitty[]> {
		const response = await fetch("localhost:3333/Kittys");
		const Kittys: Kitty[] = await response.json();
		return Kittys;
	}
	async getById(id: string): Promise<Kitty> {
		const response = await fetch(`localhost:3333/Kitty/${id}`);
		const Kitty: Kitty = await response.json();
		return Kitty;
	}
}

// Falta Fazer a rota do GetByID \\
