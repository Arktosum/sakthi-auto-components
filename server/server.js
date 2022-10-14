// Local Server using Express.js


let express = require('express')

// CORS is required for localhost accessing.
let server = express()
let cors = require('cors')
server.use(
    cors({
      origin : "*"
    })
  )

let PORT = 8080
server.get('/',(req,res)=>{
    res.send(JSON.stringify({"yo":"mama"}))
})

server.listen(PORT,(name)=>{
    console.log(`Server is live on http://localhost:${PORT}`);
})

// Do NOT forget to restart server after making changes here.


// SQL STUFF ----------------------------------------------------

let sql = require('mysql')

let con = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "shiine1984"  // Do not look at my password creep.
})

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
