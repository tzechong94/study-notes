# MySQL Notes

## BASICS

1. Create database, create table and drop table.

```sql
CREATE DATABASE pet_shop;
USE pet_shop;
CREATE TABLE cats (
    name VARCHAR(50),
    age INT
);
DESC cats; 
DROP TABLE cats;
```

1. Insert data into table and query everything. Multi insert. Default values.

- Use single quotes instead of double quotes! not all flavours of SQL allows that.

```sql
INSERT INTO cats (name, age) VALUES ('Pussycat', 5), ('John', 3), ('Meatball', 4);
SELECT * FROM cats;
```

- Default values when creating table.
- Not Null + default can be used together. 

```sql
CREATE TABLE cats4  (    
    name VARCHAR(20) NOT NULL DEFAULT 'unnamed',    
    age INT NOT NULL DEFAULT 99 
);
```

1. Primary keys.

- unique identifier. can differentiate every row. ID.
- use autoincrement
- can never be null.

```sql
CREATE TABLE unique_cats (
    cat_id INT AUTO_INCREMENT,
    name VARCHAR(100),
    age INT,
    PRIMARY KEY (cat_id)
);

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255),
    age INT NOT NULL,
    current_status VARCHAR(255) NOT NULL DEFAULT 'employed'
);
```

## CRUD basics

1. Read

- SELECT * from cats. \* means all the columns. Can also select the specific columns that you want.

- WHERE clause to narrow things down.

```sql
SELECT * from cats where age=4;
SELECT * FROM cats where name='egg';
```

- Aliases. Rename column name temporarily for display.

```sql
SELECT name as KittyName from cats;
```

1. Update Set, where ... = ...

- Changing multiple rows if there's no 'WHERE'
- Rule of thumb: Try selecting before updating to make sure you're targeting correcting.
  
```sql
UPDATE employees SET current_status='fired', last_name = 'who cares';

UPDATE cats SET age = 14 WHERE name='Misty';
```

1. DELETE FROM < table > WHERE < var > = value;

- Select first to make sure you're targeting the right row before deleting. If there is no 'WHERE', all rows will be deleted. 

```sql
DELETE FROM cats WHERE name ='Egg';
```

## Other functions

1. String functions

- Substring
- Concat
- replace
- reverse
- char_length (number of character)
- length (bytes)
- upper & lower

1. Refining selections

- DISTINCT. Select distinct author_lname from books; return distinct results. 
- ORDER BY. SELECT book_id, author_fname, author_lname FROM books ORDER BY author_lname;
- LIMIT. SELECT book_id, author_fname, author_lname FROM books ORDER BY author_lname LIMIT 5, 4; -> start, count
- LIKE. WHERE author_fname LIKE '%da%'. % means wildcard. _is exactly 1 character. wildcard is 0 or more. SELECT * FROM books WHERE author_fname LIKE '_da';

1. Aggregate Functions

- COUNT. SELECT count(DISTINCT author_fname) FROM books; COUNT(*)
- GROUP BY. SELECT author_lname, COUNT(*) FROM books GROUP BY author_lname;
- MIN and MAX. SELECT MIN(released_year) FROM books;
- subqueries. query within a query.
- sum.
- AVG. average.
  
```sql
SELECT author_lname, COUNT(*), SUM(pages)
FROM books
GROUP BY author_lname;

SELECT 
author_lname, 
COUNT(*) as books_written, 
MAX(released_year) AS latest_release,
MIN(released_year)  AS earliest_release,
    MAX(pages) AS longest_page_count
FROM books GROUP BY author_lname;
```

## Other DataTypes

1. DECIMAL(X,Y). x is total digits including decimals. y is decimal places. x digits, y of which comes after the decimal.

2. DATE. 'YYYY-MM-DD'.
3. TIME 'HH:MM:SS'.
4. DATETIME. 'YYYY-MM-DD HH:MM:SS'.

```sql
CREATE TABLE people (
name VARCHAR(100),
birthdate DATE,
birthtime TIME,
birthdt DATETIME
);
 
INSERT INTO people (name, birthdate, birthtime, birthdt)
VALUES ('Elton', '2000-12-25', '11:00:00', '2000-12-25 11:00:00');
```

1. CURTIME(), CURDATE(), NOW.

## Comparison and Logical Operators

1. !=. SELECT * FROM books
WHERE released_year != 2017;

2. NOT LIKE. SELECT * FROM books
WHERE title NOT LIKE '%e%';

3. GREATER THAN >, LESS THAN <. SELECT * FROM books
WHERE released_year > 2005;

SELECT * FROM books
WHERE pages < 500;

1. <= or >= too
1. LOGICAL AND && OR ||

```sql
SELECT title, author_lname, released_year FROM books
WHERE released_year > 2010
AND author_lname = 'Eggers';

SELECT title, author_lname, released_year FROM books
WHERE author_lname='Eggers' OR
released_year > 2010;
```

1. BETWEEN. SELECT title, released_year FROM books
WHERE released_year BETWEEN 2004 AND 2014;

```sql
SELECT * FROM people WHERE birthtime 
BETWEEN CAST('12:00:00' AS TIME) 
AND CAST('16:00:00' AS TIME);
 
 
SELECT * FROM people WHERE HOUR(birthtime)
BETWEEN 12 AND 16;
```

1. IN. Functions like multiple ORs.

```sql
SELECT title, author_lname FROM books
WHERE author_lname = 'Carver' 
OR author_lname = 'Lahiri'
OR author_lname = 'Smith';
 
SELECT title, author_lname FROM books
WHERE author_lname IN ('Carver', 'Lahiri', 'Smith');
```

1. Case statements.

```sql
SELECT title, released_year,
CASE
    WHEN released_year >= 2000 THEN 'modern lit'
    ELSE '20th Century lit'
END AS genre
FROM books;
```

1. IS NULL. SELECT * FROM books WHERE author_lname IS NULL;

## CONSTRAINTS

1. UNIQUE. phone VARCHAR(15) NOT NULL UNIQUE. means that phone number has to be unique.
2. CHECK. age INT CHECK (age > 18). check that age has to be 18, returns true or false.
3. can provide name for the constraint. CONSTRAINT age_over_18 CHECK (age > 18).

```sql
CREATE TABLE persons (
username VARCHAR(100) NOT NULL,
age INT,
CONSTRAINT age_over_18 CHECK (age > 18)
);
```

1. ALTER TABLE companies ADD COLUMN city VARCHAR(25);
2. ALTER TABLE companies DROP COLUMN city;
3. RENAME TABLE companies TO suppliers;
4. ALTER TABLE companies RENAME COLUMN name TO company_name;
5. MODIFY column type. ALTER TABLE suppliers MODIFY biz_name VARCHAR(100);
6. adding constraints. ALTER TABLE houses ADD CONSTRAINT positive_price CHECK (price>=0);

## Joining

1. Inner Join

- Intersect of venn diagram

```sql
CREATE TABLE orders (
id INT PRIMARY KEY AUTO_INCREMENT,
order_date DATE,
amount DECIMAL(8,2),
customer_id INT,
FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE --- Delete all the referenced rows
);

SELECT first_name, last_name, order_date, amount FROM customers 
JOIN orders --- join defaults to inner join
ON customers.id = orders.customer_id;
```

1. Left Join / Right join

- Select everything from A, along with any matching records in B.

## [Data Normalisation in MySQL](https://dotnettutorials.net/lesson/database-normalization-in-mysql/)

- To eliminate data redundancies and store data logically to manage data more easily.
- 6 types of normal forms: 1NF, 2NF... 5NF and Boyce Codd Normal Form.
- Usually use up to 3NF in database design.

1. 1NF: Each column must contain only one value and no table should store repeating groups of related data.
    - Each column of your table should be single-valued.
    - The values stored in each column must be of the same type.
    - Each column in a table should have a unique name.
    - You can store the data in the table in any order.
2. 2NF: Must be 1NF, and should not store duplicate rows in the same table. If there are duplicate values, they should be stored in their own separate tables and linked to the table using foreign keys. Ideal way is to create one to many relationship tables.
    - The table should be in first normal form (1NF).
    - There should not be any partial dependency.
3. 3NF: Every non-key column is mutually independent. Break columns that are interdependent into their own separate tables.
    - The table should be in Second Normal Form (2NF)
    - There should not be any transitive dependency for non-prime attributes.

```
mongoimport $MONGO_URL --username $USERNAME -d bgg -c comments --jsonArray --file ./comment.json --drop
```

grouping: primary key will be whatever you wanna group collection by.
_id: "$runtime" gives you the value. 

```js
db.tv.aggregate([
{
    $group: {
        _id: "$runtime",
        shows: {
            $push: {
                name: "$name",
                language: "$language",
                rating: "$rating"
            }
        },
        total: {$sum: 1},
        avgRating: {
            $avg: "$rating.average"
        }
    }
},
{
    $match: {
        _id: { $eq: 25}
    }
}
])
```

## Deploying to Railway

1. Application properties for railway
spring.datasource.url=${MYSQL_APP_URL}
spring.datasource.username=${MYSQL_APP_USER}
spring.datasource.password=${MYSQL_APP_PASSWORD}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

2. Railway init/ Create railway project, railway link. Choose the right project.
3. Add mysql service.
4. railway up
5. go to mysqlworkbench, create new connection.
   1. name: railway root, take the password, url, host, port, user, default schema (database) from railway project variables. Test connection.
   2. users and privileges -> add account -> change login name and include password. eg. day24 and password1234.
   3. click administrative roles -> click DBA -> apply.
6. Create new connection using the new user.
   1. Use hostname and password from the added user just now.
7. Add new variables in railway.
   1. MYSQL_APP_USER = day24
   2. MYSQL_APP_PASSWORD = 
   3. MYSQL_APP_URL = jdbc:mysql://<MYSQL_APP_USER>:<MYSQL_APP_PASSWORD>/url
8. railway up

- jdbcTemplate.query returns List
- jdbcTemplate.queryForObject returns object

## repo vs service layer

A Repository is essentially a facade for persistence that uses Collection style semantics (Add, Update, Remove) to supply access to data/objects. It is a way of decoupling the way you store data/objects from the rest of the application.

A service supplies coordination or other "services" that are required to operate your application. They are very different in that Services don't typically know how to access data from persistence, and repositories typically only access data/objects for any services you may have.


## Backup mysql from kubernetes

Choose a location to store the backup file:

Decide on a directory or folder where you want to save the backup file.
For example, you can create a folder named backups in your current working directory.
Execute the mysqldump command:

Run the following command to perform the database backup:

css
Copy code
mysqldump -h 127.0.0.1 -P <local_port> -u <username> -p <database_name> > /path/to/backup.sql
Replace <local_port> with the local port you specified during the port-forwarding step, <username> with your MySQL username, <database_name> with the name of the database you want to back up, and /path/to/backup.sql with the actual path and filename where you want to save the backup file.

Example command:

css
Copy code
mysqldump -h 127.0.0.1 -P 3306 -u myuser -p mydatabase > ./backups/backup.sql
Enter your MySQL password:

After running the mysqldump command, you will be prompted to enter your MySQL password. Enter the password associated with the specified MySQL user.
Wait for the backup process to complete:

The mysqldump command will initiate the backup process and save the database contents into the specified backup file.
The time taken for the backup process depends on the size of your database.
