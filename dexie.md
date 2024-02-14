# Dexie notes

```js
const db = new Dexie('myDB');

// Define a table
db.version(1).stores({
  myTable: 'id, name'
});

// Wait for 1 hour and delete the "myTable" table
setTimeout(() => {
  db.table('myTable').clear().then(() => {
    console.log('myTable cleared!');
  });
}, 3600000); // 1 hour in milliseconds
```

- configuration

```js
export class AppDB extends Dexie {
    characterList!: Table<Character, number>

    constructor(){
        super('ngdexieliveQuery')
        this.version(1).stores({
            characterList: "id"
        })
    }
}
export const db = new AppDB();
```

- adding a list of characters

```js
db.characterList.clear()
db.characterList.bulkAdd(this.characters)
```
