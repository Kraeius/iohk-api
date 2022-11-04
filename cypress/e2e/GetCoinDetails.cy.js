import subjects from '../fixtures/subjects.json';

// Just checks some of the information that would be shown on the UI for a coin like URL, Name, Ticker, Decimals and Description with pre-defined values

function detailCheck(urlPath, statusCode, happyCheck, amazingCheck) {
  cy.request({
    method: 'GET',
    url: urlPath,
  }).then((response) => {
    expect(response.status).to.equal(statusCode);
    if (happyCheck) {
      expect(response.body.subject).equals(subjects.HappyCoin);
      expect(response.body.url.value).equals('https://happy.io');
      expect(response.body.name.value).equals('HappyCoin');
      expect(response.body.ticker.value).equals('HAPPY3');
      expect(response.body.decimals.value).equals(6);
      expect(response.body.description.value).equals('Coin with asset name - and everyone is happy!!!');
    }
    if (amazingCheck) {
      expect(response.body.subject).equals(subjects.AmazingCoin);
      expect(response.body.url.value).equals('https://amazing.io');
      expect(response.body.name.value).equals('Amazing Coin');
      expect(response.body.ticker.value).equals('AMAZ');
      expect(response.body.decimals.value).equals(3);
      expect(response.body.description.value).equals('亜哀挨愛曖悪 АаБбВвГгДдЕеЁёЖжЗз  aąbcćdeęfghijklłmnoóprsś'); // This would be a bug since it's not a description
    }
  });
}

describe('IOHK - Metadata Tests', () => {
  it('Verify 200 - Get HappyCoin Details', () => {
    detailCheck(Cypress.config().baseUrl + subjects.HappyCoin, 200, true);
  });
  it('Verify 200 - Get AmazingCoin Details', () => {
    detailCheck(Cypress.config().baseUrl + subjects.AmazingCoin, 200, false, true);
  });
});
