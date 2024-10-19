export interface IBaseRepository<T> {
	create(data: T): Promise<T>;
	update(data: T, id: string): Promise<T>;
	delete(id: string): Promise<T | true>;
	getAll(): Promise<T[]>;
	getById(id: string): Promise<T>;
}
