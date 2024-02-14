# Angular notes

## Basics

1. A component contains of 3 parts. ts, html and css. needs a selector (the name of the component)
2. Use square brackets for attribute binding. Add @input declaration for one-way binding from parent to child.
3. Event binding. Use round brackets.
4. @Input allows parent to pass data to child component.
5. @Output allows child to pass data to the parent component. Outputs are events.

```ts
  @Output()
  valueChanged = new Subject<number>();

  @Output()
  abc = new EventEmitter<number>();
```

1. Directives. *ngIf, *ngFor. Structural and non structural.

```html
<li
*ngFor=“let item of cart; let i = index;”
[ngClass]=“{ shaded: (i % 2) }”>
{{ item }}
</li> 
```

## Forms

inputs are called controls.

1. import forms module and reactive forms module. FormsModule, ReactiveFormsModule
2. initialise a form group and a formbuilder

```ts
  regForm!: FormGroup

  constructor(private fb: FormBuilder) {

  }
```

3. create the formgroup

```ts
  private createForm(): FormGroup {
    return this.fb.group({
      name: this.fb.control<string>(''),
      email: this.fb.control<string>(''),
      age: this.fb.control<number>(18),
      attendance: this.fb.control<string>('')
    })
  }
```

4. OnInit, create form.

```ts
  ngOnInit(): void {
      this.regForm = this.createForm()
  }
```

5. assign formgroup variable to the form. attribute binding for the <form>.

```html
<form [formGroup]="regForm">
    <input type="text" size="30" formControlName="name">
```

6. (ngSubmit)="processForm()" -> submit, kinda like action in normal html form.

1. form validity. FormGroup.valid, FormGroup.invalid, FormControl.valid, FormControl.invalid.

1. Subscription. Put a $ at the end. valueChanges$!: Subscription. The thing returned is an Observable. Need to unsubscribe.

- @ViewChild
  - Allows parent component to access direct child
  - Component instance  is only available  after AfterViewInitlifecycle.
  - can use # template reference too. pick on any html element and modify it directly
  - Elementref

- @ViewChildren -> returns a list of referenced children



## Components. (Tour of heroes tutorial)

1. Generate components, define model object in component ts file.
2. Data binding to html with {{ }}.

### pipes formatting

```ts
<h2>{{hero.name | uppercase}} Details</h2>
```

- uppercase after the pipe | character, activates built-in UppercasePipe
- Pipes are a good way to format strings, currency amounts, dates, and other display data. Can also create own pipe.

### Two-way binding

- data flows from component class out to the screen and from screen back to the class.
- Set up two way binding between <input> form element and hero.name property.
- [(ngModel)] is angular's two way binding syntax. It binds properpty to the HTML textbox so data can flow in both directions.
- need to opt in to use ngModel. Opt in in app.module.ts
- Add FormsModule to the imports array in @NgModule. The imports array contains the list of external modules that the application needs.
- Every component must be decalred in exactly one NgModule.

## for loop

- use *ngFor to iterate through the list

```ts
    <li *ngFor="let hero of heroes">
```

- only exported variables in the component ts file can be accessed from the html.

## Click even binding

- (click) tells angular to listen for the button's click event.
- when clicked, angular executes onSelect(hero) expression

```ts
(click)="onSelect(hero)"
```

## conditional display

- Add the *ngIf directive to the <div> that wraps the hero details. This directive tells Angular to render the section only when the selectedHero is defined after it has been selected by clicking on a hero.

## Class binding

- Angular's class binding can add and remove a CSS class conditionally. Add [class.some-css-class]="some-condition" to the element you want to style.

## Create a feature component

- similar to react, split large components into smaller components.

## Sharing data between child and parent directives and components

- implement this with @input and @output decorators
- @input lets parent component update data in the child component. @output lets the child send data to a parent component.

### Sending data to a child component

- configure parent and child before using @input.
- to use @input in child component class, first import input and then decorate the property with @input.

#### Configure child component

```ts
import { Component, Input } from '@angular/core'; // First, import Input
export class ItemDetailComponent {
  @Input() item = ''; // decorate the property with @Input()
}
```

in the child component, add the following:

```ts
<p>
  Today's item: {{item}}
</p>
```

#### Configure parent component

1. use child's selector, <app-item detail [item]="currentItem"> 
   1. [item] is the target. "currentItem" is the source property from parent.

### Sending data to a parent component

- child component uses @output property to raise an event to notify the parent of the change. To raise an event, @Output must have the type of EventEmitter.

#### Configuring the child component

The following example features an <input> where a user can enter a value and click a <button> that raises an event. The EventEmitter then relays the data to the parent component.

1. Import output and eventemitter in child component class.

```ts
import { Output, EventEmitter } from '@angular/core'
```

1. In component class, decorate property with @output.

```ts
@Output() newItemEvent = new EventEmitter<string>();
```

1. Create an addNewItem() method in the same component class.

```ts
export class ItemOutoutComponent {
    @Output() newItemEvent = new EventEmitter<string>();

    addNewItem(value: string) {
        this.newItemEvent.emit(value)
    }
}
```

#### Configure child's template

```html
<label for="item-input">Add an item:</label>
<input type="text" id="item-input" #newItem>
<button type="button" (click)="addNewItem(newItem.value)">Add to parent's list</button>
```

#### Configuring parent's component

app.component.ts

```ts
export class AppComponent {
    items = ['item1', 'item2', 'item3', 'item4'];

    addItem(newItem: string) {
        this.items.push(newItem);
    }
}
```

#### Configure parent's template

1. Bind parent's template, bind parent's method to the child's event.

.html

```html
<app-item-output (newItemEvent)="addItem($event)"></app-item-output>
```

(newItem) -> @Output() event from child
"addItem($event)" -> handler from parent

react is a library, not a framework. angular is a framework.



## Progressive web app

1. Create manifest,
2. edit in angular json file to include icons, shortcuts etc

## Web Share api

The Web Share API provides a mechanism for sharing text, links, files, and other content to an arbitrary share target selected by the user.

The API has just two methods. The navigator.canShare() method may be used to first validate whether some data is "shareable", prior to passing it to navigator.share() for sending.

### Observables

- Every subject is an observable. It is a special type of observable that allows values to be multicasted to many Observers. Plain Observables are unicast (each subscribed observer owns an independent execution of the observable)
- Every subject is an observer.


## use proxy file 

- when you are developing, so that when you are deploying the routes are already done.
  

## Deployment

- ng build --configuration production
-  and put all the files in mvn package springboot, so you can have same origin when deploying.

## Serve with proxy
ng serve --proxy-config proxy.config.js

## Whitelabel error pages

not sure if anyone mentioned here before, but you can add an extra attribute

```ts
useHash:true
```

in

```ts
app-routing.module.ts
```

 and you won't get whitelabel error pages when you hit refresh

```ts
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```


TypeError: Cannot read properties of undefined (reading 'url') from API response --> put a question ? for undefined variables