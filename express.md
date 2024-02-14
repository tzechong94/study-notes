# ExpressJS notes

- Middleware are functions that can be used for handling request and response objects.
- Middleware takes 3 parameters: request, response and next. middlewares are run according to the order they are used (app.used(requestLogger))

```js
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
```

- Middleware functions have to be taken into use before routes if we want them to be executed before the route event handlers are called. There are also situations where we want to define middleware functions after routes. In practice, this means that we are defining middleware functions that are only called if no route handles the HTTP request.

```js
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
```

- CORS. npm install cors, app.use(cors()) for cross origin
- Move error handling into middleware
- The error that is passed forwards is given to the next function as a parameter. If next was called without a parameter, then the execution would simply move onto the next route or middleware. If the next function is called with a parameter, then the execution will continue to the error handler middleware.

Express error handlers are middleware that are defined with a function that accepts four parameters. Our error handler looks like this:

```js
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)
```

Extracting logging into its own module is a good idea in more ways than one. If we wanted to start writing logs to a file or send them to an external logging service like graylog or papertrail we would only have to make changes in one place.

- A router object is an isolated instance of middleware and routes. You can think of it as a “mini-application,” capable only of performing middleware and routing functions. Every Express application has a built-in app router.

### async await error handling -> try catch

use express-async-errors to remove try catch,
Because of the library, we do not need the next(exception) call anymore. The library handles everything under the hood. If an exception occurs in an async route, the execution is automatically passed to the error handling middleware.

- if you want all the promises to finish executing, can use Promise.all(promiseArray)

```js
beforeEach(async () => {
  await Note.deleteMany({})

  const noteObjects = helper.initialNotes
    .map(note => new Note(note))
  const promiseArray = noteObjects.map(note => note.save())
  await Promise.all(promiseArray)
})
```

- if you want the promises to be executed in a particular order, you can use a for loop

```js
beforeEach(async () => {
  await Note.deleteMany({})

  for (let note of helper.initialNotes) {
    let noteObject = new Note(note)
    await noteObject.save()
  }
})
```

- mongoose oes not have a built in validator, need to use mongoose-unique-validator library
- mongoose queries are not transactional, state of collections might change during queries.
- use populate method for joining

```js
usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('notes')

  response.json(users)
})
```

## Authorization

- limiting creation of notes to logged in users: only if post request has a valid token attached.
- use Authorization header, eg Bearer

## Problems with token based authentication

- api has blind trust to token holder. what if access rights of token holder should be revoked?

Solutions:

1. Limit validity period of a token
2. save info about each token to backend database, check each api request if the access right corresponding to the token is still valid. Server side session.
   1. this increases complexity in the backend
   2. save session to key-value database like redis
      1. use cookies