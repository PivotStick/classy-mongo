# Classy Mongo

```js
const classy = require("classy-mongo");

classy.connect("mongodb://localhost:27017/my-database").then(() => {
  console.log("Connected to DB!");
});
```

```js
const { Model } = require("classy-mongo");

class Book extends Model {
  name = String.prototype;
  pages = [String.prototype];
  isSpecial = Boolean.prototype;

  get pageCount() {
    return this.pages.length;
  }

  static getSpecials() {
    return this.find({ isSpecial: true });
  }
}

module.exports = Book;
```

```js
const Book = require("../models/Book");

module.exports = async () => {
  const result = await Book.insertOne({
    name: "Harry Potter",
    pages: ["....", "....", "....", "...."],
  });

  const book = await Book.findOne(result.insertedId);

  console.log(book.pageCount); // 4

  return book;
};
```
