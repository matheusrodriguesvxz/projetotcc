import type { Kitty } from "../entity/Kitty";
import { KittyRepository } from "../repository/KittyRepository";

export class KittyServices extends KittyRepository {
	private kittyRepository: KittyRepository;

	constructor(kittyRepository: KittyRepository) {
		super();
		this.kittyRepository = kittyRepository;
	}
	async create(kitty: Kitty): Promise<Kitty> {
		return this.kittyRepository.create(kitty);
	}
	async update(kitty: Kitty, id: string): Promise<Kitty> {
		const isExist = await this.kittyRepository.getById(id);
		if (!isExist) {
			throw new Error("Kitty not found");
		}
		return this.kittyRepository.update(kitty, id);
	}
	async delete(id: string): Promise<true | Kitty> {
		const isExist = await this.kittyRepository.getById(id);
		if (!isExist) {
			throw new Error("Kitty not found");
		}
		return this.kittyRepository.delete(id);
	}
	getAll(): Promise<Kitty[]> {
		return this.kittyRepository.getAll();
	}
	getById(id: string): Promise<Kitty> {
		const isExist = this.kittyRepository.getById(id);
		if (!isExist) {
			throw new Error("Kitty not found");
		}
		return this.kittyRepository.getById(id);
	}
}

// Falta Fazer a rota do GetByID \\