export class Guests {
	public id!: string;
	public name!: string;
	public age!: number;
	public userID!: string;
	public contact!: string;
	public sexy!: string;

	constructor(props: Omit<Guests, "id">, id?: string) {
		Object.assign(this, props);
	}
}
