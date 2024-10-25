export class Adress {
	public id!: string;
	public cep!: string;
	public street!: string;
	public number!: number;
	public city!: string;
	public userID!: string;
	public state!: string;
	public complement!: string;
	public neighborhood!: string;
	public country!: string;

	constructor(props: Omit<Adress, "id">, id?: string) {
		Object.assign(this, props);
	}
}
