const fs = require('fs');
const path = require('path');
const localDataPath = path.join(path.dirname(require.main.filename), 'data', 'books.json')
const getBooksFromFile = callBack => {
  fs.readFile(localDataPath, (err, fileContent) => {
    if (err) {
      callBack([]);
    } else {
      callBack(JSON.parse(fileContent));
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

  static fetchAll(callBack) {
    getBooksFromFile(callBack);
  }

  static findById(id, callBack) {
    getBooksFromFile(books => {
      const book = books.find(b => b.id === id);
      callBack(book);
    })
  }
}
