[Go back to Summary](./../README.md);

# MongoDB

A database is a collection of information/data. It has an interface so developers can interact with it.

## SQL (relational) vs. NoSQL (non-relational)

**SQL database** is tabular and flat. Data is storage in a table and data can be united via a join table.

For example, if there is a table with user information and another one with comments, the data can be related by creating a join table and connect the comments with the user ids.

If there is another column to be accessed by only one user, all of the other rows would need to have values for that column, even if those are null or empty. That means that patterns need to be followed to all data inputs.

**NoSQL (non-relational)** database is not tabular and data can be nested. It looks a lot with Javascript objects. That means that patterns do not need to be followed to all data, in other words, the db is more flexible, as its data values are somewhat independent.

[MongoDB](https://www.mongodb.com/) is one of the most popular databases and the most popular non-relational database. It also a part of the MEAN Stack (MongoDB, Express, Angular and Nodejs).

## MongoDB Shell Basics

To run mongo on your machine, you will need to install MongoDB and then start via `mongod`. This varies according to OS, check for [Ubuntu instructions](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/#run-mongodb-community-edition).

Start and stop MongoDB in Ubuntu using `systemd`:

```
sudo systemctl start mongod
sudo service mongod stop
```

Once it starts, open another terminal window and run, to open its shell:

```
mongo
```

It will open the Mongo Shell. Now Mongo commands will work.

- `help`: show available commands.
- `show dbs`: show all initiated databases.
- `use db_name`: switch to db_name. If it doesn't exist, it will be created.
- `db.collection_name.insert({name: "Name", age: 20})`: add collection to the current database and insert entry.
- `show collections`: show collections in the current database
- `db.collection_name.find()`: returns all elements in the collection
- `db.collection_name.find({name: "Name"})`: returns data that contains that specific property.
- `db.collection_name.update({name: "Name"}, {name: "OtherName"})`: finds the data that has that specific property and overwrite all its properties with the second parameter.
- `db.collection_name.update({name: "Name"}, {$set: {name: "OtherName"}})`: do not overwrite, rather it will keep its other properties and overwrite the specified one.
- `db.collection_name.remove({name: "Name"})`: remove data that matches passed properties
- `db.collection_name.drop()`: delete all items in collection
