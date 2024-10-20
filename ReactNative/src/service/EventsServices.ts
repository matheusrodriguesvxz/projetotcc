import type { Events } from "../entity/Event";
import { EventsRepository } from "../repository/EventsRepository";

export class EventsServices extends EventsRepository {
	private eventsRepository: EventsRepository;

	constructor(eventsRepository: EventsRepository) {
		super();
		this.eventsRepository = eventsRepository;
	}

	async create(event: Events): Promise<Events> {
		const existingEvent = await this.eventsRepository.getById(event.id);
		if (existingEvent) {
			throw new Error("Event already exists");
		}
		return this.eventsRepository.create(event);
	}

	async update(event: Events, id: string): Promise<Events> {
		const existingEvent = await this.eventsRepository.getById(event.id);
		if (!existingEvent) {
			throw new Error("Event does not exist");
		}
		return this.eventsRepository.update(event, id);
	}

	async delete(id: string): Promise<Events | true> {
		const existingEvent = await this.eventsRepository.getById(id);
		if (!existingEvent) {
			throw new Error("Event does not exist");
		}
		return this.eventsRepository.delete(id);
	}

	async getAll(): Promise<Events[]> {
		return this.eventsRepository.getAll();
	}

	async findById(id: string): Promise<Events> {
		const existingEvent = await this.eventsRepository.getById(id);
		if (!existingEvent) {
			throw new Error("Event does not exist");
		}
		return existingEvent;
	}
}
