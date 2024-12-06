import type { Companion } from "../entity/Companion";
import type { IBaseRepository } from "./IBaseRepository";

export class CompanionRepository {
	async create(companion: Companion): Promise<Companion> {
		const companions = await fetch("http://192.168.1.52:3333/companion", {
			method: "POST",
			headers: {
				"ngrok-skip-browser-warning": "true",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(companion),
		});
		if (!companions.ok) {
			throw new Error(`Erro na Requisição,status: ${companions.status}`);
		}

		const createdCompanion: Companion = await companions.json();
		return createdCompanion;
	}
	async update(companion: Companion, id: string): Promise<Companion> {
		const response = await fetch(`http://192.168.1.52:3333/companion/${id}`, {
			method: "PUT",
			headers: {
				"ngrok-skip-browser-warning": "true",

				"Content-Type": "application/json",
			},
			body: JSON.stringify(companion),
		});

		const companions: Companion = await response.json();
		return companions;
	}
	async delete(id: string): Promise<true | Companion> {
		const response = await fetch(`http://192.168.1.52:3333/companion/${id}`, {
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
	async getAll(): Promise<Companion[]> {
		const response = await fetch("http://192.168.1.52:3333/companions", {
			headers: {
				"ngrok-skip-browser-warning": "true",
			},
		});
		const companions: Companion[] = await response.json();
		if (!response.ok) {
			throw new Error(`Erro na Requisição,status: ${response.status}`);
		}
		return companions;
	}
	async getById(id: string): Promise<Companion[]> {
		const response = await fetch(`http://192.168.1.52:3333/companion/${id}`, {
			headers: {
				"ngrok-skip-browser-warning": "true",
			},
		});

		const companions: Companion[] = await response.json();
		return companions;
	}

	async countByGuestId(idGuest: string): Promise<number> {
		try {
			const response = await fetch(
				`http://192.168.1.52:3333/companion/lenght/${idGuest}`,
				{
					method: "GET",
					headers: {
						"ngrok-skip-browser-warning": "true",
					},
				},
			);

			if (!response.ok) {
				throw new Error(
					`Erro ao buscar acompanhantes: ${response.status} - ${response.statusText}`,
				);
			}

			const data = await response.json();
			return typeof data === "number" ? data : 0;
		} catch (error) {
			console.error("Erro na busca de acompanhantes:", error);
			return 0;
		}
	}
}
