# Database basics

Database contains collections. Collections are like tables. Data are saved as documents within collections. Created implicitly.

## CRUD

1. Create
   1. insertOne(data, options)
   2. insertMany(data, options) -> insert an array of objects
2. Read
   1. find(filter, options) -> filter example: {name: "john"}
      1. find gives back cursor objects, which allows us to cycle through results instead of displaying everything.
   2. findOne(filter, options) -> find only the first matching element
      1. findOne does not return cursor objects
   3. {distance: {$gt 10000}} Can use comparison operators as filters.
3. Update
   1. updateOne(filter, data, options)
   2. updateMany(filter, data, options)
   3. replaceOne(filter, data, options) -> use this instead of update because update replaces everything.
   4. Update document requires atomic operators {$set {name: "john"}}
      1. $push and $pop.
      2. upsert by default false
4. Delete
   1. deleteOne(filter, options)
   2. deleteMany(filter, options)

## Other notes

- skip (offset), limit
- sort (-1 ascending, 1 descending)

## Projection

- Don't want to fetch unnecessary data. filter out from the mongodb end instead of manipulating the data.
- 0 means dont show. 1 means show. id has to be explicitly 0.

## Sprint boot specific

- projection in springboot: exclude/include

```java
Document d = ...
JsonReader r = Json.createReader(
   new StringReader(d.toJson()); // gives json string
)
JsonObject j = j.readObject();
```

```bash
mongoimport --authenticationDatabase=admin mongodb://mongo: -d playstore -c googleplaystore --type=csv --headerline --file googleplaystore.csv
```

## Unwinding Arrays

1. Cannot process elements in an array, need to simplify the document by expanding the array.
   1. Duplicate the document for every element in the array so final document will no longer have any arrays in fields.

## using mongo with express

To modify the method we need to change the configurable options of the schema, options can be changed using the set method of the schema, see here for more info on this method: https://mongoosejs.com/docs/guide.html#options. See https://mongoosejs.com/docs/guide.html#toJSON and https://mongoosejs.com/docs/api.html#document_Document-toObject for more info on the toJSON option.

see https://mongoosejs.com/docs/api.html#transform for more info on the transform function.

```javascript
noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
```

```bash
mongoimport "mongodb://localhost:27017" -d shows -c tv --jsonArray --file tv-shows.json
```

## day26workshop

## Steps

### 1. application.properties

```
mongo.url=mongodb://localhost:27017
OR
mongo.url=MONGO_URL
On Terminal
export MONGO_URL=<url>
```

### 2. set up folders

```
config
controller
model
repository
service
```

### 3. create/set up config file

```
AppConfig.java
@Configuration
```

### 4. create Constants.java file

```
for public static final String ... = ...

import static <path>.*
to use Strings
```

### 5. create a model file

```
to set attributes according to task requirements
include getters and setters
- JsonObject toJSON method ; if needed
```

### 6. Need Jakarta.Json Dependency to build JsonObject

```
<dependency>
            <groupId>org.glassfish</groupId>
            <artifactId>jakarta.json</artifactId>
            <version>2.0.1</version>
	</dependency>
```

### 7. Repository

```
Specify criteria and return mongoTemplate.find(query, Document.class, COLLECTION_GAMES);
List<Document>
```

### 8. Service

```
Create method to use Repository method and stream() to transform and use data retrieved from MongoDB
List<Game>
e.g.
public List<Game> getGames(Integer offset, Integer limit){
    return gamesRepo.getGames(offset, limit).stream()
                    .map(g -> Game.create(g))
                    .toList();
}
- The Game.create(g) method sets the values for Game attributes after receiving from MongoDB
```

# Day26 Lecture

## MongoDB on MAC terminal

### 1. Check for services

MacOS

```
brew services list
```

Check for mongoDB and collection/table

```
mongosh
show databases
use 'database'
show collections
db.'collection/table'.findOne()
```

### 2. Start server

```
brew services start mongodb-community@6.0
```

### 3. Import data into MongoDB

```
mongoimport "mongodb://localhost:27017" --drop -d shows -c tv --jsonArray --file tv-shows.json
```

--drop if exists
-d database
-c collection/table
--jsonArray type of data

### 4. Jackson.json Dependency

```
<dependency>
            <groupId>org.glassfish</groupId>
            <artifactId>jakarta.json</artifactId>
            <version>2.0.1</version>
	</dependency>
```

### 5. MongoDB commands

```
Get all data : db.<collection_name>.find()
Single condition : db.tv.find({ title: 'Dark Crystal'})
Multiple conditions : db.tv.find({ language: 'English', type: 'Scripted'})
Case insensitive search : db.tv.find({ title: { $regex: "crystal", $options: "i"}, year: 1982 })
Look for _id : db.tv.find({ _id: ObjectId('abc123')})
```

### 6. MongoDB operators

Logical

```
$and, $or, $not, $nor
```

Comparison

```
$eq, $neq, $gt, $gte, $lt, $lte, $in, $nin
```

Element query

```
$exists, $type
```

### 7. MongoDB commands with operators

and + gte + gt

```
db.tv.find({
    $and: [
        { "year": { $gte: 1984 } },
        { "rating.average": { $gt: 5 } }
    ]
})
```

in (check if genre has any one of the values in the array)

```
db.tv.find({
    genre: {
        $in: [ "Drama", "Horror", "Adventure" ]
        }
})
```

exists (find the document which has the awards attribute)

```
db.tv.find({
    awards: { $exists: true}
})
```

distinct (returns an array of unique values for that field)

```
db.tv.distinct('rated')
```

count (count the number of documents returned in the query)

```
db.tv.find({
    genre: {
        $in: [ "Drama", "Horror", "Adventure" ]
        }
}).count()
```

skip / limit / sort

```
db.tv.find().skip(<int>).limit(<int>).sort(<1> or <-1>)
sort: 1 = ascending, -1 = descending
```

# Day28 Lecture

## MongoDB on MAC terminal

1. Check for services
   MacOS

```
brew services list
```

Check for mongoDB and collection/table

```
mongosh
show databases
use 'database'
show collections
db.'collection/table'.findOne()
```

2. Start server

```
brew services start mongodb-community@6.0
```

3. Import data into MongoDB

```
mongoimport "mongodb://localhost:27017" --drop -d bgg -c comments --jsonArray --file comment.json
mongoimport "mongodb://localhost:27017" -d bgg -c games --jsonArray --file game.json
```

mongoimport "mongodb://localhost:27017" --drop -d boardgames -c comments --jsonArray --file comment.json

mongoimport "mongodb://localhost:27017" -d boardgames -c games --jsonArray --file game.json

--drop if exists
-d database
-c collection/table
--jsonArray type of data

## PM

```
1. Log into Railway website
2. Create Project
3. Add MongoDB service
4. Go to Studio 3T
5. New Connection
6. Paste mongo url from Railway MongoDB 'connect'. i.e. Mongo Connection URL "<url>"
7. Set connection name. e.g. mongo@playstore
8. Make sure you are on Hotspot or NUS ISS MOBILE wifi to connect
9. If project has been created on railway website, use railway link
```

Importing .csv file into Railway mongoDB database

```
mongoimport --authenticationDatabase=admin "<url>" -d <db_name> -c <collection> --type=csv --headerline --file googleplaystore.csv
```

## fullstackopen notes

### References across collections (similar to foreign key in sql)

- can use aggregation queries
- can add references to other collection in both collections, or you can even add the referenced data into the collection.
- mongoose populate is like join queries. populate the model with the item that is referenced in the ID.

mongodb+srv://<username>:<password>@cluster0.hblhfor.mongodb.net/?retryWrites=true&w=majority

mongoimport "mongodb://localhost:27017" -d restaurantdb -c restaurants --jsonArray --file restaurants.json

- mongodb validation

```js
const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true,
  },
  important: Boolean,
});
```
