const { selectCards, selectSingleCard } = require("./model");

const getCards = (req, res, next) => {
  selectCards()
    .then((body) => res.status(200).send(body))
    .catch(next);
};

const getSingleCard = (req, res, next) => {
  const { cardId } = req.params;
  selectSingleCard(cardId)
    .then((body) => res.status(200).send(body))
    .catch(next);
};

module.exports = { getCards, getSingleCard };
