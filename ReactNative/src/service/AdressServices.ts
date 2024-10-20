import type { Adress } from "../entity/Adress";
import type { AdressRepository } from "../repository/AdressRepository";

export class AdressServices implements AdressRepository {
	private adressRepository: AdressRepository;

	constructor(adressRepository: AdressRepository) {
		this.adressRepository = adressRepository;
	}

	async create(adress: Adress): Promise<Adress> {
		const isExist = await this.adressRepository.getById(adress.id);
		if (isExist) {
			throw new Error("Adress already exists");
		}

		const createdAdress = await this.adressRepository.create(adress);
		return createdAdress;
	}
	async update(adress: Adress, id: string): Promise<Adress> {
		const isExist = await this.adressRepository.getById(id);
		if (!isExist) {
			throw new Error("Adress not found");
		}

		const updatedAdress = await this.adressRepository.update(adress, id);
		return updatedAdress;
	}
	async delete(id: string): Promise<true | Adress> {
		const isExist = await this.adressRepository.getById(id);
		if (!isExist) {
			throw new Error("Adress not found");
		}
		const deletedAdress = await this.adressRepository.delete(id);
		return deletedAdress;
	}
	async getAll(): Promise<Adress[]> {
		return await this.adressRepository.getAll();
	}
	async getById(id: string): Promise<Adress> {
		const isExist = await this.adressRepository.getById(id);
		if (!isExist) {
			throw new Error("Adress not found");
		}
		const adress = await this.adressRepository.getById(id);
		return adress;
	}
}
