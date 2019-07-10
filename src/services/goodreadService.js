const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app:goodreadService');

const parser = xml2js.Parser({ explicitArray: false });
function goodreadService() {
  function getBookById(id) {
    return new Promise((resolve, reject) => {
      axios.get(`https://www.goodreads.com/book/show/${id}.xml?key=YHWwKh0OCkikYvPu8y5A`)
        .then((response) => {
          parser.parseString(response.data, (err, resulte) => {
            if (err) {
              debug(err);
            } else {
              debug(resulte);
              resolve(resulte.goodreadService.book);
            }
          })
        })
        .catch((error) => {
          reject(error);
          debug(error);
        });

    });
  }
  return { getBookById };
}

module.exports = goodreadService();