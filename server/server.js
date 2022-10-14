// Local Server using Express.js
let sql = require('mysql')
let con = sql.createConnection({
  host: "localhost",
  user: "root",
  port: "4040", // must be in string. ;-;
  database:"db",
  password: "shiine1984"  // Do not look at my password creep.
})

con.connect((err)=>{
  if (err) throw err;
  console.log("Connected to SQL Successfully!");
});


let express = require('express')

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
  // SQLquery(con,
  //   `INSERT INTO employees (id,name,designation) VALUES (${data.ID},'${data.name}','${data.designation}')`,
  //   'Inserted 1 record!'
  //   )
  SQLquery(con,
    `SELECT * FROM employees`,
    'Success!',
    (rp)=>{
      console.log("hello");
      console.log(rp)
    }
    )

})
server.listen(PORT,(name)=>{
    console.log(`Server is live on http://localhost:${PORT}`);
})

// Do NOT forget to restart server after making changes here.


// SQL STUFF ----------------------------------------------------




// Using Legacy 5.x Encryption. May lead to security vulnerabilities.



// Helper function to deal with queries.
function SQLquery(con,query,logMessage=undefined,resFunc=undefined) {
  con.query(query,(err,res)=>{
      if (err) throw err;
      if(logMessage) console.log(logMessage)
      if(resFunc) resFunc(res)
  });
}

// Common SQL Queries
// CREATE DATABASE _DATABASE_NAME
// Once we create a database, use the database name to connect to it specifically.


// Queries Ran
// "CREATE DATABASE db"

//"CREATE TABLE employees(id INT PRIMARY KEY,name VARCHAR(255),designation VARCHAR(255))"
// INSERT INTO employees (id,name,designation) VALUES (${data.ID},'${data.name}','${data.designation}')` Note, VARCHAR needs '' at ends for query to work.

