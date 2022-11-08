const request = require("supertest");
const app = require("../server");

describe("GET /notARoute", () => {
  test("client receives '404 Not Found' for a GET request to an invalid route", () => {
    return request(app)
      .get("/notARoute")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("404 Not Found (Invalid Path)");
      });
  });
});

describe("GET /cards", () => {
  test("returns an array of accurate card objects", () => {
    return request(app)
      .get("/cards")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual(
          expect.objectContaining([
            {
              title: "card 1 title",
              imageUrl: "/front-cover-portrait-1.jpg",
              card_id: "card001",
            },
            {
              title: "card 2 title",
              imageUrl: "/front-cover-portrait-2.jpg",
              card_id: "card002",
            },
            {
              title: "card 3 title",
              imageUrl: "/front-cover-landscape.jpg",
              card_id: "card003",
            },
          ])
        );
      });
  });
});

describe("GET /cards/:cardId", () => {
  test("returns a single card identified by its id", () => {
    return request(app)
      .get("/cards/card003")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual({
          title: "card 3 title",
          imageUrl: "/front-cover-landscape.jpg",
          card_id: "card003",
          base_price: 200,
          availableSizes: [
            {
              id: "md",
              title: "Medium",
            },
            {
              id: "lg",
              title: "Large",
            },
          ],
          pages: [
            {
              title: "Front Cover",
              templateId: "template006",
            },
            {
              title: "Inside Top",
              templateId: "template007",
            },
            {
              title: "Inside Bottom",
              templateId: "template007",
            },
            {
              title: "Back Cover",
              templateId: "template008",
            },
          ],
        });
      });
  });
  test("requests for non-valid card IDs are rejected (404)", () => {
    return request(app)
      .get("/cards/card101")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("card101 is not a valid card ID.");
      });
  });
  test("invalid input requests are rejected (400)", () => {
    return request(app)
      .get("/cards/cardnumber101")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe(
          "Card ID format not valid. Correct format example: card123."
        );
      });
  });
});
