import type { Companion } from "../entity/Companion";
import { CompanionRepository } from "../repository/CompanionRepository";


export class CompanionServices extends CompanionRepository {
    public companionRepository: CompanionRepository

    constructor(companionRepository: CompanionRepository) {
        super();
        this.companionRepository = companionRepository;
    }
    create(companion: Companion): Promise<Companion> {
        const created = this.companionRepository.create(companion);
        return created;

    }
    update(companion: Companion, id: string): Promise<Companion> {
        const updated = this.companionRepository.update(companion, id);
        return updated;

    }
    delete(id: string): Promise<true | Companion> {
        const deleted = this.companionRepository.delete(id);
        return deleted;
    }
    getAll(): Promise<Companion[]> {
        const getAll = this.companionRepository.getAll();
        return getAll;
    }
    getById(id: string): Promise<Companion[]> {
        const getByID = this.companionRepository.getById(id);
        return getByID;
    }

    async getCountByGuest(idGuest: string): Promise<number> {
        return await this.companionRepository.countByGuestId(idGuest);
      }
      
}