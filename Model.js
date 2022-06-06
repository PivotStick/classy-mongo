const _ = require('./db');
const { cast } = require('./cast');
const { ObjectId } = require('mongodb');
const pluralize = require('pluralize');

const getSchema = (m) => {
	const instance = new m();
	return {
		instance,
		schema: { ...instance }
	};
};

const castIdFitler = (filter) => {
	if (filter && '_id' in filter && !(filter._id instanceof ObjectId)) {
		filter._id = ObjectId(filter._id);
	}
};

class Model {
	_id = ObjectId.prototype;

	async populate(key) {
		const type = getSchema(this.constructor).schema[key];
		if (type.constructor === Array) {
			this[key] = await Promise.all(this[key].map((id) => type[0].constructor.findById(id)));
		} else {
			this[key] = await type.constructor.findById(this[key]);
		}
		return this[key];
	}

	update(filter) {
		return this.constructor.updateOne({ _id: this._id }, filter);
	}

	delete() {
		return this.constructor.deleteOne({ _id: this._id });
	}

	static get collection() {
		if (this._collection) return this._collection;

		let name = this.name.replace(/\B[A-Z]/g, '-$&').toLowerCase();
		name = pluralize(name);

		return (this._collection = _.db.collection(name));
	}

	static cast(document) {
		return cast(getSchema(this), document);
	}

	static async find(filter) {
		castIdFitler(filter);
		const documents = await this.collection.find(filter).toArray();
		return documents.map((document) => this.cast(document));
	}

	static async findOne(filter) {
		castIdFitler(filter);
		const document = await this.collection.findOne(filter);
		return this.cast(document);
	}

	static findById(_id) {
		return this.findOne({ _id });
	}

	static insertOne(doc) {
		return this.collection.insertOne(doc);
	}

	static insertMany(docs) {
		return this.collection.insertMany(docs);
	}

	static updateOne(filter, update) {
		castIdFitler(filter);
		return this.collection.updateOne(filter, update);
	}

	static updateMany(filter, update) {
		castIdFitler(filter);
		return this.collection.updateMany(filter, update);
	}

	static deleteOne(filter) {
		castIdFitler(filter);
		return this.collection.deleteOne(filter);
	}

	static deleteMany(filter) {
		castIdFitler(filter);
		return this.collection.deleteMany(filter);
	}
}

exports.Model = Model;
