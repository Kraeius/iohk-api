import subjects from '../fixtures/subjects.json';

// Checks the response of each property by adding /properties/key to a subject's endpoint. Expects it to return 200 and the body is not null

const subjectKeys = [
  'subject',
  'url',
  'name',
  'ticker',
  'decimals',
  'policy',
  'logo',
  'description',
];

function propertyCheck(urlPath, statusCode) {
  cy.request({
    method: 'GET',
    url: urlPath,
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).to.equal(statusCode);
    expect(response.body).not.equals(null);
  });
}

describe('IOHK - Metadata Property Tests', () => {
  it('Verify 200 - Get Metadata Properties for HappyCoin', () => {
    subjectKeys.forEach((i) => {
      propertyCheck(Cypress.config().baseUrl + subjects.HappyCoin + `/properties/${i}`, 200);
    });
  });
  it('Verify 200 - Get Metadata Properties for AmazingCoin', () => {
    subjectKeys.forEach((i) => {
      propertyCheck(Cypress.config().baseUrl + subjects.AmazingCoin + `/properties/${i}`, 200);
    });
  });
  it('Verify 404 - No Property Content Found', () => {
    propertyCheck(
      'http://metadata-server-mock.herokuapp.com/metadata/2048c7e09308f9138cef8f1a81733b72e601d016eea5eef759ff2933416d617a696e67436f696e/properties', // No property given
      404
    );
  });
});
