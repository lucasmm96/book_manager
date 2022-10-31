const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const dotenv = require('dotenv');

let _db;

dotenv.config();

const mongoConnect = callback => {
  MongoClient.connect(process.env.mongoURL)
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
