const db = require('../util/database')

module.exports = class Book {
  constructor(id, title, author, added_at, finished_at, score, status) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.added_at = added_at;
    this.finished_at = finished_at;
    this.score = score;
    this.status = status;
  };

  save() {
    if(this.id) {
      return db.execute(
        'UPDATE node_course.book SET title = ?, author = ?, added_at = ?, finished_at = ?, score = ?, status = ? WHERE id = ?',
        [this.title, this.author, this.added_at, this.finished_at, this.score, this.status, this.id]
      );
    } else {
      return db.execute(
        'INSERT INTO node_course.book (title, author, added_at, finished_at, score, status) VALUES (?, ?, ?, ?, ?, ?)',
        [this.title, this.author, this.added_at, this.finished_at, this.score, this.status]
      );
    }
  };

  static remove(id) {
    return db.execute('DELETE FROM node_course.book WHERE id = ?', [id]);
  };

  static fetchAll() {
    return db.execute('SELECT * FROM node_course.book;');
  };

  static findById(id) {
    return db.execute('SELECT * FROM node_course.book WHERE id = ?', [id]);
  };
}
