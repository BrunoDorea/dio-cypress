/* eslint-disable cypress/no-unnecessary-waiting */
describe('Test Suite - Auth API Testing', () => {
  it('1 - POST credentials to auth endpoint with success (v1)', () => {
    cy.request({
      method: 'POST',
      url: '/auth', 
      body: {
        'username': 'admin',
        'password': 'password123'
      },
      headers: { 'Content-Type': 'application/json' },
      failsOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200); //validar status code
      expect(response.body).to.have.property('token').and.to.be.a('string'); //validar se contem a propriedade token no body e se é do tipo string
      expect(response.body).not.to.be.empty; // verificar se não retorna vazio
    });
  })

  it('2 - POST credentials to auth endpoint with success (v2)', () => {
    let body = {
      'username': 'admin',
      'password': 'password123'
    }

    cy.postRequest(Cypress.env('auth_url'), {'Conten-Type': 'application/json'}, body).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token').and.to.be.a('string');
      expect(response.body).not.to.be.empty;
    }).debug()
  })
})