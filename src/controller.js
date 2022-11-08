const { selectCards } = require("./model");

const getCards = (req, res, next) => {
  selectCards()
    .then((body) => res.status(200).send(body))
    .catch(next);
};

module.exports = { getCards };