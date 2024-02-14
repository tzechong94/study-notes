# Redux notes

action -> dispatcher -> store -> view -> action...

The state is stored in a store. The whole state of the application is stored in one
javascript object in the store. If state was more complicated, different things in the state
would be saved as separate fields of the object.

state of the store is changed with actions. actions are objects with at least a field determining the type of action. (and/or payload)

{
    type: 'INCREMENT',
    payload: {

    }
}

impact of action is defined using reducer. a function that is given the current state and an action as parameters, returning new state.

A reducer state must be composed of immutable objects. If there is a change in the state, the old object is not changed, but it is replaced with a new, changed, object. This is exactly what we did with the new reducer: the old array is replaced with the new one.

- Declare all the different actions in the reducer, and the state that they return.
- create store in the component code.
- in the component code, create functions that dispatch the actions. for example.
- store.getState() to get state

```js
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }
```

- uncontrolled forms --> state of the form fields are not bound to the state of the component
- certain limitations, like dynamic error messages or disabling submit button are not possible
- when a component is composed of many smaller components, how do all components access the store?

- The useDispatch hook provides any React component access to the dispatch function of the Redux store defined in index.js. This allows all components to make changes to the state of the Redux store.
- The component can access the notes stored in the store with the useSelector-hook of the react-redux library.

current understanding:

- reducer contains all the actions (functions) that will change the state
- in the components, usedispatch calls the actions that will change the store
- useselector allows you to select the state to be used
- combineReducers
- similar to usestate hook, but declared in different places
- use redux toolkit
- reducer actions are functions to be dispatched so state could be changed
- use redux toolkit, create a slice to define the actions functions inside
- different state fields require different reducers. declare the in stores
- 

```js
dispatch(createNote('Redux Toolkit is awesome!'))
```

equivalent to

```js
dispatch({ type: 'notes/createNote', payload: 'Redux Toolkit is awesome!' })
```

## redux thunk

use redux thunk to implement async actions.
With Redux Thunk it is possible to implement action creators which return a function instead of an object. The function receives Redux store's dispatch and getState methods as parameters. This allows for example implementations of asynchronous action creators, which first wait for the completion of a certain asynchronous operation and after that dispatch some action, which changes the store's state.

## React query

React Query is a server-state library, responsible for managing asynchronous operations between your server and client
Redux, etc. are client-state libraries that can be used to store asynchronous data, albeit inefficiently when compared to a tool like React Query
So React Query is a library that maintains the server state in the frontend, i.e. acts as a cache for what is stored on the server. React Query simplifies the processing of data on the server, and can in some cases eliminate the need for data on the server to be saved in the frontend state.

Most React applications need not only a way to temporarily store the served data, but also some solution for how the rest of the frontend state (e.g. the state of forms or notifications) is handled.

