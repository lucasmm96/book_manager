const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect('mongodb+srv://lucasma:vhftoJv2cCYWdg9C@cluster0.y7lomn8.mongodb.net/?retryWrites=true&w=majority')
  .then(client => {
    console.log('Successfully Connected to db!');
    _db = client.db();
    callback();
  })
  .catch(err => {
    console.log(err);
    throw err;
  });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No db found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
