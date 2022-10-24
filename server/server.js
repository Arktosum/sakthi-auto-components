// Local Server using Express.js
let express = require('express')

let sql = require('./sql')
let hash = require('./hashing')

let DBpath = 'server\\database.db'
// CORS is required for localhost accessing.
let server = express()
let cors = require('cors')

server.use(express.json()); // To parse POST input body. IMPORTANT.
server.use(
    cors({origin : "*"})
)

  // Do NOT forget to restart server after making changes here.
let PORT = 8080
server.get('/',(req,res)=>{
    res.send(JSON.stringify({"yo":"mama"}))
})


server.post('/signup',(req,res)=>{
  let data = req.body
  let db = sql.connectDB(DBpath)
  sql.queryAll(db,`INSERT INTO EMPLOYEES VALUES (${data.ID},'${data.name}','${data.designation}','${hash.hash("sha256",data.pass)}')`,(err,DATA)=>{
    if(err && err.errno === 19 ){ // err.code = SQLITE_CONSTRAINT
      res.send({error : -1})
    }
    else{
      res.send({error :  0})
    }
  })
  // do NOT forget '' for VARCHAR inputs.
  sql.closeDB(db)
  sql.displayTable("EMPLOYEES",DBpath)
})


server.post('/login',(req, res)=>{
    let data = req.body
    let hashed = hash.hash("sha256",data.pass)
    let db = sql.connectDB(DBpath)
    sql.queryAll(db,`SELECT * FROM EMPLOYEES WHERE ID = ${data.id} AND NAME = '${data.name}' AND PASSWORD = '${hashed}'`,(err,DATA)=>{
      if(err){throw err}
      if(DATA.length != 0){// authorised.
        res.send({error : 0,id:DATA[0].ID})
      }
      else{
        res.send({error : -1})
      } 
    }) 
    
  sql.closeDB(db)
})

server.post('/get_daily',(req, res)=>{
  let data = req.body
  let db = sql.connectDB(DBpath)
  sql.queryAll(db,`SELECT * FROM EMP_DAILY WHERE ID = ${data.id}`,(err,DATA)=>{
    if(err){console.log(err.code)}
    else{res.send(DATA)}
  }) 
  sql.closeDB(db)
})
server.post('/userdata',(req, res)=>{
  let data = req.body
  let db = sql.connectDB(DBpath)
  sql.queryAll(db,`SELECT * FROM EMPLOYEES WHERE ID = ${data.id}`,(err,DATA)=>{
    if(err){throw err}
    if(DATA.length != 0){// authorised.
      res.send({error : 0,data:DATA[0]})
    }
    else{
      res.send({error : -1})
    } 
  }) 
  
sql.closeDB(db)
})

server.post('/daily',(req,res)=>{
  let data = req.body
  console.log(data)
  let db = sql.connectDB(DBpath)
  sql.queryAll(db,`INSERT INTO EMP_DAILY VALUES (${data.id},
    '${data.date}',
    ${data.rhsi},
    ${data.rmi},
    ${data.rq},
    ${data.cc},
    ${data.pp},
    ${data.kaizen})`,(err,DATA)=>{
    if(err){ // err.code = SQLITE_CONSTRAINT
      console.log(err)
      if(err.errno === 19){res.send({error : -1})}
      else{res.send({error : -2})}
    }
    else{
      res.send({error :  0})
    }
  })
  // do NOT forget '' for VARCHAR inputs.
  sql.closeDB(db)
  sql.displayTable("EMP_DAILY",DBpath)
})

server.listen(PORT,(name)=>{
    console.log(`Server is live on http://localhost:${PORT}`);
})


sql.displayTable("EMP_DAILY",DBpath)


