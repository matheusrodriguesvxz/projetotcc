import type { Guests } from "../entity/Guests";
import type { GuestsRepository } from "../repository/GuestsRepository";

export class GuestsServices  {
	private guestsRespository: GuestsRepository;

	constructor(guestsRespository: GuestsRepository) {
		this.guestsRespository = guestsRespository;
	}

	async create(guests: Guests): Promise<Guests> {
		const existingGuests = await this.guestsRespository.getById(guests.id);
		if (existingGuests) {
			throw new Error("Guests already exists");
		}
		return this.guestsRespository.create(guests);
	}

	async update(guests: Guests, id: string): Promise<Guests> {
		const existingGuests = await this.guestsRespository.getById(id);
		if (!existingGuests) {
			throw new Error("Guests not found");
		}
		return this.guestsRespository.update(guests, id);
	}

	async delete(id: string): Promise<Guests | true> {
		const existingGuests = await this.guestsRespository.getById(id);
		if (!existingGuests) {
			throw new Error("Guests not found");
		}
		return this.guestsRespository.delete(id);
	}

	async getAll(): Promise<Guests[]> {
		return this.guestsRespository.getAll();
	}

	async findById(id: string): Promise<Guests> {
		const existingGuests = await this.guestsRespository.getById(id);
		if (!existingGuests) {
			throw new Error("Guests not found");
		}
		return existingGuests;
	}
}
