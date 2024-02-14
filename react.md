# React Notes

## Chapter 1a: Introduction to React

- passing data to components
use props

```js
const Hello = (props) =>{
    return (
        <div>
        <p>Hello {props.name}</p>
        </div>
    )
}
```

- React component name must be capitalised
- React component has to return only one element. Use <> to prevent extra div elements
- In React, the individual things rendered in braces must be primitive values, such as numbers or strings, cannot be object. 
- Forbidden to mutate state directly in react because it can result in unexpected side effects. For example, don't do this:

```js
const handleLeftClick = () => {
  clicks.left++
  setClicks(clicks)
} 
const handleLeftClick = () => {
  allClicks.push('L')
  setAll(allClicks)
  setLeft(left + 1)
}
```

- Store into separate piees of state. Do this instead.

```js
const handleLeftClick = () =>
  setClicks({ ...clicks, left: clicks.left + 1 })

const handleLeftClick = () => {
  setAll(allClicks.concat('L'))
  setLeft(left + 1)
}
```

- By default, effects run after every completed render, but you can choose to fire it only when certain values have changed.

```js
const hook = () => {
  console.log('effect')
  axios
    .get('http://localhost:3001/notes')
    .then(response => {
      console.log('promise fulfilled')
      setNotes(response.data)
    })
}

useEffect(hook, [])
```

CHILD TO PARENT

```js
import React from 'react';

const Persons = ({ newSearch, persons, deletePerson }) => {
  const handleDelete = (id) => {
    deletePerson(id);
  };

  return (
    <>
      {newSearch === ''
        ? persons.map(person => (
            <p key={person.id}>
              {person.name} {person.number}
              <button onClick={() => handleDelete(person.id)}>delete</button>
            </p>
          ))
        : persons
            .filter(person => person.name.includes(newSearch))
            .map(person => (
              <p key={person.id}>
                {person.name} {person.number}
                <button onClick={() => handleDelete(person.id)}>delete</button>
              </p>
            ))}
    </>
  );
};

export default Persons;
```

```js
import React, { useState } from 'react';
import Persons from './Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'John Doe', number: '1234567890' },
    { id: 2, name: 'Jane Smith', number: '9876543210' },
    // other person objects...
  ]);

  const deletePerson = (id) => {
    setPersons(prevPersons => prevPersons.filter(person => person.id !== id));
  };

  return (
    <div>
      <h1>My App</h1>
      {/* Other components */}
      <Persons persons={persons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
```

- GET error message -> (error.response.data.error)

## conditional render forms

A slightly odd looking, but commonly used React trick is used to render the forms conditionally:

```js
{
  user === null && loginForm()
}
```

props.children

ref mechanism - access variable outside of component. reference to the component

- The function that creates the component is wrapped inside of a forwardRef function call. This way the component can access the ref that is assigned to it.

The component uses the useImperativeHandle hook to make its toggleVisibility function available outside of the component.

We can now hide the form by calling noteFormRef.current.toggleVisibility() after a new note has been created:

- npm install propTypes -> define mandatory or required prop

## Testing

npm install --save-dev @testing-library/react @testing-library/jest-dom

## Router

- import BrowserRouter as Router
- Link changes the path
- Route -> dictates what element to show at different paths
- useNavigate() -> programmatically change the route
- useParams() -> get the parameterized route as a variable
- To recap, hooks may only be called from the inside of a function body that defines a React component. useNavigate and useParams are hooks
  - Don’t call Hooks inside loops, conditions, or nested functions. Instead, always use Hooks at the top level of your React function.
  - Don’t call Hooks from regular JavaScript functions. Instead, you can:
  - Call Hooks from React function components.
  - Call Hooks from custom Hooks

- <Navigate replace to="/"> redirects to /. replace - replaces current entry in the history stack with the new '/' entry
- useMatch to get parameterized route

### Custom hooks

- use it to simplify forms input: useFields
- save custom hooks in /src/hooks/index.js
- the thing that is returned from the custom hook is assigned to the variables initialised with the custom hook
  
```js
const [notes, noteService] = useResource(baseUrl+'/api/notes)
```

```js
const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
  useEffect(()=>{
    axios.get(baseUrl)
    .then(response => {
      if (response.status === 200) {
        setResources(response.data)
      }
    })
  }, [])

  const getAll = async () => {
    const request = await axios.get(baseUrl)
    setResources(request.data)
  }

  const create = async (resource) => {
    const request = await axios.post(baseUrl, resource)
    setResources([...resources, request.data])
  }

  const service = {
    create, getAll
  }

  return [
    resources, service
  ]
}
```

the useState resources within the custom hook will be the state for the constant declared

### React hook form
- useForm() hook. register to register all the fields
- isTouched: whether user interacted, isDirty: whether input value has been changed compared to default value
- states change without re rendering the page
- react strict mode renders twice during development
- validation is 2nd argument for register
- use devtool to visualise
- displaying error message: formState.errors. <p>{errors.username?.message}</p>
- custom validation to form fields
  - add key value pair to options object, passed in the register function
  - key - validate: (fieldValue) => {
  }

```js
  validate: {
    notAdmin: (fieldValue) => {
        return (fieldValue !== "admin@example.com" || 
        "Enter a different email address"
        )
    },
    notBlackListed: (fieldValue) => {
        return !fieldValue.endsWith("baddomain.com") ||
        "This domain is not supported"
  }
}
```
Default values: 

```js
    const form = useForm<FormValues>({
        defaultValues: {
            username: "Batman",
            email: "",
            channel: ""
        }
    })
```

```js
        defaultValues: async () => {
            const response = await fetch("https://jsonplaceholder.typicode.com/users/1")
            const data = await response.json()
            return {
                username: 'Batman',
                email: data.email,
                channel: ""
            }
        }
```

- Nested Object. Add to formvalues type., and register each key to the control.
- Array. field.0, field.1
- dynamic fields -> import usefieldarray, add new field as default values, destructure fields, append, remove from usefieldarray.
- numeric & date values: set valueAsNumber to true
- watch() method
- if want to create a sideeffect after watching, use callback version of watch
- getValues to read field values. -> does not trigger rerender or subscribe to input changes. better method to get values
- setValues.
- disbled form field. disabled field in register 
- handle submission error => separation of logic for successful submission and failed validation
- isValid - track validity of form
<button disabled={!isDirty || !isValid} type="submit">Submit</button>
- form submission state
  - isSubmitting
  - isSubmitted
  - isSubmitSuccessful
  - submitCount
- reset. dont call in onsubmit. use useeffect and isSubmitSuccessful. can customize reset too
- async validation with custom validation
- validation modes -> determine when the validation should occur. onTouched, onBlur, onSubmit, onChange, all
- manually trigger validations
  - trigger("fieldName")
- Yup integration
  - npm install yup @hookform/resolvers