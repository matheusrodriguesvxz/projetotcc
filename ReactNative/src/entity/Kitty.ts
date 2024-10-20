export class Kitty {
	public id!: string;
	public goal!: string;
	public descriptions!: string;

	constructor(props: Omit<Kitty, "id">, id?: string) {
		Object.assign(this, props);
	}
}
// Falta Fazer a rota do GetByID \\
