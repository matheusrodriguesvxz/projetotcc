import type { Kitty } from "../entity/Kitty";
import type { IBaseRepository } from "./IBaseRepository";

export class KittyRepository implements IBaseRepository<Kitty> {
	async create(kitty: Kitty): Promise<Kitty> {
		const response = await fetch(
			"https://7e40-2804-47e4-8879-8400-2d14-62e4-5bc8-a69d.ngrok-free.app/Kitty",
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
			`https://7e40-2804-47e4-8879-8400-2d14-62e4-5bc8-a69d.ngrok-free.app/Kitty/${id}`,
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
			`https://7e40-2804-47e4-8879-8400-2d14-62e4-5bc8-a69d.ngrok-free.app/Kitty/${id}`,
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
			"https://7e40-2804-47e4-8879-8400-2d14-62e4-5bc8-a69d.ngrok-free.app/Kittys",
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
			`https://7e40-2804-47e4-8879-8400-2d14-62e4-5bc8-a69d.ngrok-free.app/Kitty/${id}`,
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

