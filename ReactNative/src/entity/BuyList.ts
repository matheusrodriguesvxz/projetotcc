export class BuyLists {
  reduce(arg0: (acc: any, item: any) => any, arg1: {}) {
    throw new Error("Method not implemented.");
  }
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
