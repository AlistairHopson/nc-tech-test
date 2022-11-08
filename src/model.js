const cards = require("./data/cards.json");
const templates = require("./data/templates.json");

exports.selectCards = async () => {
  const filteredCards = cards.map((x) => ({
    title: x.title,
    imageUrl: x.pages[0].templateId,
    card_id: x.id,
  }));

  for (x in filteredCards) {
    filteredCards[x].imageUrl = templates.find(
      (card) => card.id === filteredCards[x].imageUrl
    ).imageUrl;
  }

  return filteredCards;
};

exports.selectSingleCard = async (cardId) => {
  const sizeFormatter = { sm: "Small", md: "Medium", lg: "Large", gt: "Giant" };

  if (!cardId.match(/^card[0-9]*$/)) {
    return Promise.reject({
      status: 400,
      message: "Card ID format not valid. Correct format example: card123.",
    });
  }

  if (!cards.find((x) => x.id === cardId)) {
    return Promise.reject({
      status: 404,
      message: `${cardId} is not a valid card ID.`,
    });
  }

  const singleCard = cards.find((x) => x.id === cardId);
  let formattedSingleCard = {
    title: singleCard.title,
    imageUrl: singleCard.pages[0].templateId,
    card_id: singleCard.id,
    base_price: singleCard.basePrice,
    availableSizes: singleCard.sizes.map((x) => ({
      id: x,
      title: sizeFormatter[x],
    })),
    pages: singleCard.pages,
  };

  formattedSingleCard.imageUrl = templates.find(
    (card) => card.id === formattedSingleCard.imageUrl
  ).imageUrl;

  return formattedSingleCard;
};
