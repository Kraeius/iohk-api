import urls from "../../support/resources/urls.json";

const subjectKeys = [
  "subject",
  "url",
  "name",
  "ticker",
  "decimals",
  "policy",
  "logo",
  "description",
];

function subjectKeyCheck(urlPath, statusCode, keyCheck) {
  cy.request({
    method: "GET",
    url: urlPath,
  }).then((response) => {
    expect(response.status).to.equal(statusCode);
    if (keyCheck) {
      subjectKeys.forEach((i) => {
        expect(response.body).to.have.property(subjectKeys[i]);
      });
    }
    if (riverCheck) {
    }
  });
}

describe("IOHK - Metadata Tests", () => {
  it("Verify 200 - Get Metadata", () => {
    authorKeyCheck(urls.HappyCoin, 200, true);
  });
});
