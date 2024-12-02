import type { Events } from "../entity/Event";
import type { EventAndGuests } from "../entity/EventAndGuests";
import { EventAndGuestsRepository } from "../repository/EventsAndGuestsRepository";
import { EventsRepository } from "../repository/EventsRepository";

export class EventAndGuestsServices extends EventAndGuestsRepository {
	private eventsRepository: EventAndGuestsRepository;

	constructor(eventsRepository: EventAndGuestsRepository) {
		super();
		this.eventsRepository = eventsRepository;
	}

	
	async create(event: EventAndGuests): Promise<EventAndGuests> {
		return this.eventsRepository.create(event);
	}

	async update(event: EventAndGuests, id: string): Promise<EventAndGuests> {
		const existingEvent = await this.eventsRepository.getById(event.id);
		if (!existingEvent) {
			throw new Error("Event does not exist");
		}
		return this.eventsRepository.update(event, id);
	}

	async delete(id: string): Promise<EventAndGuests | true> {
		return this.eventsRepository.delete(id);
	}

	async getAll(): Promise<EventAndGuests[]> {
		return this.eventsRepository.getAll();
	}

	async findById(id: string): Promise<EventAndGuests> {
		const existingEvent = await this.eventsRepository.getById(id);
		if (!existingEvent) {
			throw new Error("Event does not exist");
		}
		return existingEvent;
	}
}
