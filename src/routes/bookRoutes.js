const express = require('express');
const bookController = require('../controllers/bookController');
const bookService = require('../services/goodreadService');
const bookRouter = express.Router();


function router(nav) {
  const {getIndex,getById,middleware} = bookController(nav,bookService);
  bookRouter.use(middleware);
  bookRouter.route('/')
    .get(getIndex);

  bookRouter.route('/:id')
    .get(getById);
  return bookRouter;
}
module.exports = router;