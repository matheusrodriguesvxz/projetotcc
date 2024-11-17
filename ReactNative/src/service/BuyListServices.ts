import type { BuyLists } from "../entity/BuyList";
import type { BuyListRepository } from "../repository/BuyListRepository";

export class BuyListServices implements BuyListRepository {
	private buyListRepository: BuyListRepository;

	constructor(buyListRepository: BuyListRepository) {
		this.buyListRepository = buyListRepository;
	}

	create(buyList: BuyLists): Promise<BuyLists> {
		return this.buyListRepository.create(buyList);
	}
	update(buyList: BuyLists, id: string): Promise<BuyLists> {
		const existingBuyList = this.buyListRepository.getById(id);
		if (!existingBuyList) {
			throw new Error("BuyList does not exist");
		}
		return this.buyListRepository.update(buyList, id);
	}
	delete(id: string): Promise<true | BuyLists> {
		const existingBuyList = this.buyListRepository.getById(id);
		if (!existingBuyList) {
			throw new Error("BuyList does not exist");
		}
		return this.buyListRepository.delete(id);
	}
	getAll(): Promise<BuyLists[]> {
		return this.buyListRepository.getAll();
	}
	getById(id: string): Promise<BuyLists> {
		const existingBuyList = this.buyListRepository.getById(id);
		if (!existingBuyList) {
			throw new Error("BuyList does not exist");
		}
		return this.buyListRepository.getById(id);
	}
}
