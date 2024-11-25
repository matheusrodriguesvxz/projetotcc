export class EventAndGuests {
	public id!: string;
	public id_guests!: string;
	public id_events!: string;

	constructor(props: Omit<EventAndGuests, "id">, id?: string) {
		Object.assign(this, props);
	}
}
