// Local Server using Express.js

let express = require('express')
const sqlite3 = require('sqlite3').verbose();

let DBpath = './database.db'
// CORS is required for localhost accessing.
let server = express()
let cors = require('cors')
server.use(express.json()); // To parse POST input body. IMPORTANT.
server.use(
    cors({origin : "*"})
  )

let PORT = 8080
server.get('/',(req,res)=>{
    res.send(JSON.stringify({"yo":"mama"}))
})
server.post('/',(req,res)=>{
  let data = req.body
  let db = connectDB(DBpath)
  queryAll(db,`INSERT INTO EMPLOYEES VALUES (${data.ID},'${data.name}','${data.designation}')`,(err,data)=>{
    if(err && err.message == "SQLITE_CONSTRAINT: UNIQUE constraint failed: EMPLOYEES.id"){
      res.send({"error" : -1});
    }
    else{
      res.send({"error" : 0})
    }
    console.log("Inserted 1 data.");
  }) // do NOT forget '' for VARCHAR inputs.
  closeDB(db)
  displayTable("EMPLOYEES")
})
server.listen(PORT,(name)=>{
    console.log(`Server is live on http://localhost:${PORT}`);
})

function connectDB(path,mode=undefined) {  // Mode is OPEN_READWRITE | OPEN_CREATE if not exists by default.
  let db = new sqlite3.Database(path, (err) => {
    if (err){
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });
  return db
}
function closeDB(db){
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Closed the database connection.');
  });
}
function queryAll(db,sql,callback){
  // Query all will query and return every row at the same time.
  // other types of queries : each (gives row by row control) , get (gives first row control)
  db.all(sql,(err,rows)=>{
    callback(err,rows)
  })
}
// Failing constraints like ID's PRIMARY KEY constraint throws a SQLITE_CONSTRAINT error.

function displayTable(tableName){
  let db = connectDB(DBpath)
  queryAll(db,`SELECT * FROM ${tableName}`,(data)=>{
    console.log(data);
  })
  closeDB(db)
}

// function delete_record(tableName, id){
//   let db = connectDB(DBpath)
//   queryAll(db, `DELETE FROM ${tableName} WHERE id = ${id}`)
// }

// Do NOT forget to restart server after making changes here.

// SQL STUFF ----------------------------------------------------


// Common SQL Queries
// CREATE DATABASE _DATABASE_NAME
// Once we create a database, use the database name to connect to it specifically.


// Queries Ran
// "CREATE DATABASE db"

//"CREATE TABLE employees(id INT PRIMARY KEY,name VARCHAR(255),designation VARCHAR(255))"
// INSERT INTO employees (id,name,designation) VALUES (${data.ID},'${data.name}','${data.designation}')` Note, VARCHAR needs '' at ends for query to work.

