// const mongoDb = require('mongodb');
// const getDb = require('../util/database').getDb;

// let db;

// class User {
//   constructor(username, email) {
//     this.username = username;
//     this.email = email;
//   }
  
//   save() {
//     const db = getDb();
//     return db.collection('users').insertOne(this)
//       .then()
//       .catch(err => console.log(err));
//   }
  
//   static findById(userId) {
//     const db = getDb();
//     return db.collection('users').findOne({ _id: new mongoDb.ObjectId(userId) })
//       .then()
//       .catch(err => console.log(err));
//   }
// }

// module.exports = User;