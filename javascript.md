# JS notes

## Promise

- Functional way of saying if else.
- 

1. Provider
   1. Pass the promise a callback with 2 parameters

```js
const callMe = new Promise((resolve,reject) => {
    // if resolve
    resolve(data);

    // if failed reject
    reject(error)
})
```

1. Consumer
   1. has 2 functions for listening to resolve and reject

```js
callMe
    .then((data)=>{
        //promise resolved
    })
    .catch((error) => {
        // promise rejected
    })
```

- throws will pass data to catch. valid data in then will skip catch and go to the next then.
- promise returns 1 value.

Observable -> asynchronous way of working on multiple values
Promise -> async way of working on single value

## HttpClient 

Http Requests always return observables. It will only send out data if there is a subscriber.

```js
this.weatherSvc.onNextItem.subscribe(
    (data)=>{...}
)
```

```js
@Injectable
export class WeatherService {
    onWeather = new Subject<>()
    getWeather() {
        weather
        onWeather.next(weather)
    }
}

@Component() // component 1
export class Display{
    constructor(private weatherSvc) {
    }

    this.weatherSvc.onWeather.subscribe(data=> {

    }) // this references the onWeather subject!
}

@Component
export class getWeather{
    this.weatherSvc.getWeather() // this gets the getweather and it has the weather value
}
```
