const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = callback => {
  MongoClient.connect('mongodb+srv://lucasma:vhftoJv2cCYWdg9C@cluster0.y7lomn8.mongodb.net/?retryWrites=true&w=majority')
  .then(client => {
    console.log('Successfully Connected!');
    callback(client);
  })
  .catch(err => {
    console.log(err);
  });
}

module.exports = mongoConnect;