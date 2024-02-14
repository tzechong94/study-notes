## Async await

There are a few important details to pay attention to when using async/await syntax. To use the await operator with asynchronous operations, they have to return a promise. This is not a problem as such, as regular asynchronous functions using callbacks are easy to wrap around promises.

The await keyword can't be used just anywhere in JavaScript code. Using await is possible only inside of an async function.

This means that in order for the previous examples to work, they have to be using async functions. Notice the first line in the arrow function definition:

```js
const main = async () => {
  const notes = await Note.find({})
  console.log('operation returned the following notes', notes)

  const response = await notes[0].remove()
  console.log('the first note is removed')
}

main()
```

- async await won't wait for the async operations to run finish if it is defined inside another async function.
- One way of fixing this is to wait for all of the asynchronous operations to finish executing with the Promise.all method:


## removing try catch

- The express-async-errors library has a solution for removing try catch.

## Testing API

- use the supertest package to help us write our tests for testing the API.

## Creating users

 Users have a unique username, a name and something called a passwordHash. The password hash is the output of a one-way hash function applied to the user's password. It is never wise to store unencrypted plain text passwords in the database!

 use bcrypt

use populate method to join different queries together in mongodb with mongoose.

```js
usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('notes', { content: 1, important: 1 })

  response.json(users)
})
```

## jsonwebtoken for authentication

- post username and password to login endpoint
- backend validates and returns correct status and a token with the response.
- the browser saves the token to the state of the application.
- when new note is created, token is sent with the request.
- server uses token to identify user.
- token authentication must always be used over HTTPS, instead of HTTP.
  
### Authorisation header

- send token from browser to server with authorization header. The header tells which authentication scheme is used. This tells the server how the attached credentials should be interpreted.
- Bearer is used for the lesson.

### Problems of token based authentication

- API has a blind trust to the token holder. What if access rights should be revoked?
- Two solutions. 
  - First is to limit the validity period of a token. Make user relogin. Error handling has to be extended for expired token.
  - second is to save info about each token to the backend database and to check for each api request if the access right corresponding to the token is still valid. Access rights can then be revoked anytime. -> Server side session.
    - However this increases the complexity in the backend as well as the performance, since every api request has to be checked if database needs to be accessed every single time. It is more common to save session to a key value database such as Redis coz it's faster. Instead of authorization header, cookies are used for transferring token between client and server. 


1. Creating users
   1. Come up with the model
   2. add into app
   3. create controller
   4. use uniquevalidator in model


1. Login
   1. Use jwt for token authentication
      1. create a secret key, use it with jwt.sign(json, secret) to get token
   2. use bcrypt for passwordhash comparison
   3. add router into app.js

### Middleware

function or program that is going to run between the server gets the request and server sends the response to the client.

1. Middleware can be used in all routers, can be used in a specific one, or can be used in a specific operation.
2. runs in order. next() tells the next middleware to run. the (res, req) => of the controllers is middleware too.
3. middleware has access to req and response.

### Conditional rendering react trick
A slightly odd looking, but commonly used React trick is used to render the forms conditionally:

{
  user === null && loginForm()
}

### persist to local storage

Values saved to the storage are DOMstrings, so we cannot save a JavaScript object as it is. The object has to be parsed to JSON first, with the method JSON.stringify. Correspondingly, when a JSON object is read from the local storage, it has to be parsed back to JavaScript with JSON.parse.

```js
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
```

logout

```js
window.localStorage.removeItem('loggedNoteappUser')
```
