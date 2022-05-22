import {
	DeleteResult,
	Filter,
	InsertManyResult,
	InsertOneResult,
	ObjectId,
	OptionalId,
	UpdateFilter,
	UpdateResult,
	WithId,
	Collection
} from 'mongodb';

type M = typeof Model;
type I<T> = InstanceType<T>;

export class Model {
	_id = ObjectId.prototype;

	static get collection<T extends M>(this: T): Collection<I<T>>;

	static cast<T extends M>(this: T, document: any): I<T>;

	static find<T extends M>(this: T, filter: Filter<I<T>>): Promise<WithId<I<T>>[]>;

	static findOne<T extends M>(this: T, filter: Filter<WithId<I<T>>>): Promise<WithId<I<T>>>;

	static findById<T extends M>(this: T, id: string | ObjectId): Promise<WithId<I<T>>>;

	static insertOne<T extends M>(this: T, doc: OptionalId<I<T>>): Promise<InsertOneResult<I<T>>>;

	static insertMany<T extends M>(
		this: T,
		docs: OptionalId<I<T>>[]
	): Promise<InsertManyResult<I<T>>>;

	static updateOne<T extends M>(
		this: T,
		filter: Filter<I<T>>,
		update: Partial<I<T>> | UpdateFilter<I<T>>
	): Promise<UpdateResult>;

	static updateMany<T extends M>(
		this: T,
		filter: Filter<I<T>>,
		update: UpdateFilter<I<T>>
	): Promise<I<T> | UpdateResult>;

	static deleteOne<T extends M>(this: T, filter: Filter<I<T>>): Promise<DeleteResult>;

	static deleteMany<T extends M>(this: T, filter: Filter<I<T>>): Promise<DeleteResult>;
}
