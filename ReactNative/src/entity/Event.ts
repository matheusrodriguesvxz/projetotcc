export class Events {
	public id!: string;
	public name!: string;
	public description!: string;
	public budget!: string;
	public final_date!: Date;
	public id_adress!: string;
	public userID!: string;
	public id_kitty?: string;
	public initial_date!: Date;
	public olderOfAge!: boolean;
	public pix?: string;
	public type!: string;

	constructor(props: Omit<Events, "id">, id?: string) {
		Object.assign(this, props);
	}
}
