import subjects from '../fixtures/subjects.json';

// Response codes are checked for 200 and 404
// Checks that each key exists and not null for Happy and Amazing coins
// On a scenario for an non-existing subject, "not found" is searched in the response

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

function subjectKeyCheck(urlPath, statusCode, keyCheck, subjectCheck) {
  cy.request({
    method: 'GET',
    url: urlPath,
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).to.equal(statusCode);
    if (keyCheck) {
      subjectKeys.forEach((i) => {
        expect(response.body).to.have.property(i).and.not.equals(null);
      });
    }
    if (subjectCheck) {
      expect(response.body).to.contains('not found');
    }
  });
}

describe('IOHK - Metadata Tests', () => {
  it('Verify 200 - Get HappyCoin Metadata', () => {
    subjectKeyCheck(Cypress.config().baseUrl + subjects.HappyCoin, 200, true);
  });
  it('Verify 200 - Get AmazingCoin Metadata', () => {
    subjectKeyCheck(Cypress.config().baseUrl + subjects.AmazingCoin, 200, true);
  });
  it('Verify 404 - No Content Found', () => {
    subjectKeyCheck('http://metadata-server-mock.herokuapp.com/metadataa/2048c7e09308f9138cef8f1a81733b72e601d016eea5eef759ff2933416d617a696e67436f696e', 404); // A typo on metadata
  });
  it('Verify 200 - No Subject Found', () => {
    subjectKeyCheck('http://metadata-server-mock.herokuapp.com/metadata/2048c7e09308f9138cef8f1a81733b72e601d016eea5eef759ff2933416d617a696e67436f696ef', 200, false, true); // Returns 200 and a body but 404 maybe used here?
  });
});
