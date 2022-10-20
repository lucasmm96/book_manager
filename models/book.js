const books = [];

module.exports = class Book {
  constructor(title, author, added_at, finished_at, score, status) {
    this.title = title;
    this.author = author;
    this.added_at = added_at;
    this.finished_at = finished_at;
    this.score = score;
    this.status = status;
  }
  
  save() {
    books.push(JSON.parse(JSON.stringify(this)));
  }
  
  static fetchAll() {
    return books;
  }
}
