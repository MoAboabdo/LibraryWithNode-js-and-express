const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');
const adminRouter = express.Router();

const books = [
  {
    title: 'War and Peace',
    genra: 'Historical Fiction',
    author: 'Lev Nikolayevich Tolstoy',
    bookId:656,
    read: false
  },
  {
    title: 'The Dark World',
    genra: 'Fantasy',
    author: 'Henry kuttner',
    bookId:24280,
    read: false
  },
  {
    title: 'A Journey into center of the Earth',
    genra: 'Science Fiction',
    author: 'Jules Verne',
    read: false
  },
  {
    title: 'The Wind in the Willows',
    genra: 'Fantasy',
    author: 'Kenneth Grahame',
    read: false
  },
];

function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);
          const response = await db.collection('books').insertMany(books);
          res.json(response);
        }
        catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });
  return adminRouter;
}

module.exports = router;