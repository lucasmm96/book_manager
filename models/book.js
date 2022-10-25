const fs = require('fs');
const path = require('path');
const localDataPath = path.join(path.dirname(require.main.filename), 'data', 'books.json')
const getBooksFromFile = callback => {
  fs.readFile(localDataPath, (err, fileContent) => {
    if (err) {
      callback([]);
    } else {
      callback(JSON.parse(fileContent));
    }
  });
};

module.exports = class Book {
  constructor(title, author, added_at, finished_at, score, status) {
    this.id = Math.random().toString();
    this.title = title;
    this.author = author;
    this.added_at = added_at;
    this.finished_at = finished_at;
    this.score = score;
    this.status = status;
  }

  save() {
    getBooksFromFile(books => {
      books.push(this);
      fs.writeFile(localDataPath, JSON.stringify(books), err => {
        console.log(err);
      });
    });
  }

  static remove(bookId) {
    getBooksFromFile(books => {
      const updatedBookList = books.filter(book => book.id !== bookId);
      fs.writeFile(localDataPath, JSON.stringify(updatedBookList), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(callback) {
    getBooksFromFile(callback);
  }

  static findById(id, callback) {
    getBooksFromFile(books => {
      const book = books.find(b => b.id === id);
      callback(book);
    })
  }
}
