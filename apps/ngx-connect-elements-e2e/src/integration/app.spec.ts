import { getGreeting } from '../support/app.po';

describe('ngx-connect-elements', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to ngx-connect-elements!');
  });
});
