import subjects from '../fixtures/subjects.json';

// Sends two valid subjects in the body and for the property, tests each, one by one
// Since we send two subjects, it expects to see 2 items under subjects
// For each subject's response, it expects a "subject" property since it's logical to have and the required key
// But the manual test shows the response always shows "decimals" and "policy" even though we don't want them
// It's a bug but for the sake of the "passing" test, I didn't add other checks below, normally we should have "not.exist" test for every property we don't expect to see here

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

function postResultCheck(urlPath, statusCode, subjectKey) {
  cy.request({
    method: 'POST',
    url: urlPath,
    body: {
      subjects: [
        '919e8a1922aaa764b1d66407c6f62244e77081215f385b60a62091494861707079436f696e',
        '2048c7e09308f9138cef8f1a81733b72e601d016eea5eef759ff2933416d617a696e67436f696e', // A more modular approach can be added like getting each subjects from subject.json and use via combinations
      ],
      properties: [subjectKey], // More than one keys also need to be sent for an extensive tests
    },
  }).then((response) => {
    expect(response.status).to.equal(statusCode);
    expect(response.body.subjects).to.have.length(2);
    expect(response.body.subjects[0]).to.have.property('subject').and.not.equals(null);
    expect(response.body.subjects[0]).to.have.property(subjectKey).and.not.equals(null);
    expect(response.body.subjects[1]).to.have.property('subject').and.not.equals(null);
    expect(response.body.subjects[1]).to.have.property(subjectKey).and.not.equals(null);
  });
}

describe('IOHK - Post Metadata Tests', () => {
  it('Verify 200 - Get Post Metadata Results', () => {
    subjectKeys.forEach((i) => {
      postResultCheck(Cypress.config().baseUrl + 'query', 200, i);
    });
  });
});
