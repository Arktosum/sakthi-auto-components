const sqlite3 = require('sqlite3').verbose();

function connectDB(path,mode=undefined) {  // Mode is OPEN_READWRITE | OPEN_CREATE if not exists by default.
    let db = new sqlite3.Database(path, (err) => {
      if (err) {
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
      if(err){throw err}
      callback(rows)
    })
  }
  // Failing constraints like ID's PRIMARY KEY constraint throws a SQLITE_CONSTRAINT error.
  
function displayTable(tableName,path){
    let db = connectDB(path)
    queryAll(db,`SELECT * FROM ${tableName}`,(data)=>{
      console.log(data);
    })
    closeDB(db)
}
module.exports = { connectDB,closeDB,queryAll,displayTable};
  // Do NOT forget to restart server after making changes here.
  
  
  // SQL STUFF ----------------------------------------------------
  
/*
  Common SQL Queries
  CREATE DATABASE _DATABASE_NAME
  Once we create a database, use the database name to connect to it specifically.
  
  
  Queries Ran
  "CREATE DATABASE db"
  
  "CREATE TABLE employees(id INT PRIMARY KEY,name VARCHAR(255),designation VARCHAR(255))"
  INSERT INTO employees (id,name,designation) VALUES (${data.ID},'${data.name}','${data.designation}')` Note, VARCHAR needs '' at ends for query to work.
  
  Current database:

  Employees
    ID       |     Name      | Designation  |   Password ( sha256 hashed)
  

*/