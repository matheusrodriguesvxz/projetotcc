export class BuyLists {
	id!: string;
	name!: string;
	status!: string;
	id_events!: string;
	quantity!: string;
	userID!: string;
	totalPrice!: string;

	constructor(props: Omit<BuyLists, "id">, id?: string) {
		Object.assign(this, props);
	}
}
