const _ = require("./db");
const { cast } = require("./cast");
const { ObjectId } = require("mongodb");

const getSchema = (m) => {
  const instance = new m();
  return {
    instance,
    schema: { ...instance },
  };
};

class Model {
  _id = ObjectId.prototype;

  static get collection() {
    let name = this.name.replace(/\B[A-Z]/g, "-$&").toLowerCase();
    name = name.endsWith("y") ? name.slice(0, -1) + "ies" : name + "s";
    return _.db.collection(name);
  }

  static async find(filter) {
    const documents = await this.collection.find(filter).toArray();
    return documents.map((document) => cast(getSchema(this), document));
  }

  static async findOne(filter) {
    const document = await this.collection.findOne(filter);
    return cast(getSchema(this), document);
  }

  static findById(id) {
    return this.findOne({ _id: ObjectId(id) });
  }

  static insertOne(doc) {
    return this.collection.insertOne(doc);
  }

  static insertMany(docs) {
    return this.collection.insertMany(docs);
  }

  static updateOne(filter, update) {
    return this.collection.updateOne(filter, update);
  }

  static updateMany(filter, update) {
    return this.collection.updateMany(filter, update);
  }

  static deleteOne(filter) {
    return this.collection.deleteOne(filter);
  }

  static deleteMany(filter) {
    return this.collection.deleteMany(filter);
  }
}

exports.Model = Model;
