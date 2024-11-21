import type { BuyLists } from "../entity/BuyList";
import type { IBaseRepository } from "./IBaseRepository";

export class BuyListRepository implements IBaseRepository<BuyLists> {
	async create(buyList: BuyLists): Promise<BuyLists> {
		const response = await fetch("http://192.168.0.4:3333/buyList", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(buyList),
		});
		if (!response.ok) {
			throw new Error(`Erro na Requisição,status: ${response.status}`);
		}
		const buyListCreated: BuyLists = await response.json();
		return buyListCreated;
	}
	async update(buyList: BuyLists, id: string): Promise<BuyLists> {
		const response = await fetch(`http://192.168.0.4:3333/buyList/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(buyList),
		});
		if (!response.ok) {
			throw new Error(`Erro na Requisição,status: ${response.status}`);
		}
		const updatedBuyList: BuyLists = await response.json();
		return updatedBuyList;
	}
	async delete(id: string): Promise<true | BuyLists> {
		const response = await fetch(`http://192.168.0.4:3333/buyList/${id}`, {
			method: "DELETE",
		});

		if (!response.ok) {
			throw new Error(`Erro na Requisição,status: ${response.status}`);
		}
		return response.status === 204 ? true : await response.json();
	}
	async getAll(): Promise<BuyLists[]> {
		const response = await fetch("http://192.168.0.4:3333/buyList");
		const buyList: BuyLists[] = await response.json();
		if (!response.ok) {
			throw new Error(`Erro na Requisição,status: ${response.status}`);
		}
		return buyList;
	}
	async getById(id: string): Promise<BuyLists> {
		const response = await fetch(`http://192.168.0.4:3333/buyList/${id}`);
		if (!response.ok) {
			throw new Error(`Erro na Requisição,status: ${response.status}`);
		}
		const buyList: BuyLists = await response.json();
		return buyList;
	}
	async getByEventID(userID: string): Promise<BuyLists> {
		const response = await fetch(`http://192.168.0.4:3333/buyList/${userID}`);
		if (!response.ok) {
			throw new Error(`Erro na Requisição,status: ${response.status}`);
		}
		const buyList: BuyLists = await response.json();
		return buyList;
	}
}
