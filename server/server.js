// Local Server using Express.js
let express = require('express')

let sql = require('./sql')
let hash = require('./hashing')

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
  console.log(data)
  let db = sql.connectDB(DBpath)
  sql.queryAll(db,`INSERT INTO EMPLOYEES VALUES (${data.ID},'${data.name}','${data.designation}','${hash.hash("sha256",data.pass)}')`,(DATA)=>{
    console.log("Inserted 1 data.",DATA);
  }) // do NOT forget '' for VARCHAR inputs.
  sql.closeDB(db)
  sql.displayTable("EMPLOYEES",DBpath)
})

server.post('/login',(req, res)=>{
    let data = req.body
    let hashed = hash.hash("sha256",data.pass)
    let db = sql.connectDB(DBpath)
    sql.queryAll(db,`SELECT * FROM EMPLOYEES WHERE NAME = '${data.name}' AND PASSWORD = '${hashed}'`,(DATA)=>{
      if(DATA.length != 0){// authorised.
        res.send({error : 0})
      }
      else{
        res.send({error : -1})
      } 
    }) 
    
  sql.closeDB(db)
})


server.listen(PORT,(name)=>{
    console.log(`Server is live on http://localhost:${PORT}`);
})

sql.displayTable("EMPLOYEES",DBpath)

// Current Database
// Ideathon 
// eYantra
// Sakthi auto components
// Mini projects (MPMC , IIoT, CNC)