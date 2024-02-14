# JEST NOTES

Windows users: Jest may not work if the path of the project directory contains a directory that has spaces in its name.

- npm run test, where test = "jest --verbose"
- test files have to include .test. in the name

```js
const reverse = require('../utils/for_testing').reverse

test('reverse of a', () => {
    const result = reverse('a')
    expect(result).toBe('a')
})
```

- Group tests together with describe
  
```js
describe('average', () => {
  test('of one value is the value itself', () => {
    expect(average([1])).toBe(1)
  })

  test('of many is calculated right', () => {
    expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5)
  })

  test('of empty array is zero', () => {
    expect(average([])).toBe(0)
  })
})
```

- run single test if there's bug with 'only' method, or -t flag

## external libraries

https://lodash.com/ 

There is a slight issue in the way that we have specified the mode of the application in our scripts: it will not work on Windows. We can correct this by installing the cross-env package as a development dependency with the command:

npm install --save-dev cross-envcopy
We can then achieve cross-platform compatibility by using the cross-env library in our npm scripts defined in package.json:

{
  // ...
  "scripts": {
    "start": "cross-env NODE_ENV=production node index.js",
    "dev": "cross-env NODE_ENV=development nodemon index.js",
    // ...
    "test": "cross-env NODE_ENV=test jest --verbose --runInBand",
  },
  // ...
}

- use supertest to help write tests for API

## frontend testing 

Tests will be implemented with the same Jest testing library developed by Facebook that was used in the previous part. Jest is configured by default to applications created with create-react-app.

In addition to Jest, we also need another testing library that will help us render components for testing purposes. The current best option for this is react-testing-library which has seen rapid growth in popularity in recent times.

### Clicking buttons in tests

npm install --save-dev @testing-library/user-event

### test forms by simulating text input with userEvent

### coverage

CI=true npm test -- --coverage

### snapshot testing by jest

### end to end testing CYPRESS

- can use selenium, or headless browsers, but cypress more convenient
- cypress tests are run completely within the browser
- don't use arrow functions because they might cause some issues in certain situations

```js
describe('Blog app', function() {
  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('blogs')
    cy.contains('React patterns Michael Chan')
  })
})
```

get rid of eslint error for cy
npm install eslint-plugin-cypress --save-dev 

The cy.get command allows for searching elements by CSS selectors.

- important for database to be the same each time you run the test.
- to do this, create API endpoints for the backend tests. empty database using these endpoints

```js
it('login fails with wrong password', function() {
  // ...

  cy.get('.error').should('contain', 'wrong credentials') 
  cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
  cy.get('.error').should('have.css', 'border-style', 'solid')
})
```

```js
it('one of those can be made important', function () {
  cy.contains('second note').parent().find('button').as('theButton')
  cy.get('@theButton').click()
  cy.get('@theButton').should('contain', 'make not important')
})
```

### read this for cypress e2e testing

https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Cypress-Can-Be-Simple-Sometimes

getBy vs findBy vs queryBy

1. 1 element only. 1+ match, will get error.
2. if no match, queryBy returns null, the rest error
3. findBy allows await

getAllBy vs findAllBy vs queryAllBy

1. no match only queryAllBy returns array, the rest error.
2. if 1+ match, all returns array.
3. findAllby allows await
4. 