// Local Server using Express.js
let express = require('express')

let sql = require('./sql')
let hash = require('./hashing')

let DBpath = 'server\\database.db'
// CORS is required for localhost accessing.
let server = express()
let cors = require('cors')
let path  = require('path')
server.use(express.json()); // To parse POST input body. IMPORTANT.
server.use(cors({origin : "*"})) // CORS for CROSS ORIGIN access

server.use(express.static(path.join(__dirname, '..','client')))
server.use(express.static(path.join(__dirname, '..','client','login'),{index: 'login.html'}))
// Do NOT forget to restart server after making changes here.
let PORT = 8080
server.get('/',(req,res)=>{

})


server.post('/signup',(req,res)=>{
  console.log("Sign up!")
  let data = req.body
  sql.queryAll(DBpath,
    `INSERT INTO EMPLOYEES (ID,NAME,DESIGNATION,PASSWORD) VALUES (${data.id},'${data.name}','${data.designation}','${hash.hash("sha256",data.pass)}')`,(err,DATA)=>{
      if(err) {if(err.errno === 19 ){  res.send({error : -1}) }else{ console.log(err); res.send({error : -2})}}
      else{ res.send({error :  0}) } 
  })
  // do NOT forget '' for VARCHAR inputs.
})


server.post('/login',(req, res)=>{
    console.log("Log In!")
    let data = req.body
    let hashed = hash.hash("sha256",data.pass)
    sql.queryAll(DBpath,`SELECT * FROM EMPLOYEES WHERE ID = ${data.id} AND NAME = '${data.name}' AND PASSWORD = '${hashed}'`,(err,DATA)=>{
      if(DATA.length != 0){// authorized.
        res.send({error : 0,id:DATA[0].ID})
      }
      else{
        res.send({error : -1})
      } 
    }) 
})

// ----------------------------------- PAGE QUERIES -----------------------------------------------

server.post('/userdata',(req, res)=>{
  console.log("User data!")
  let data = req.body
  sql.queryAll(DBpath,`SELECT * FROM EMPLOYEES WHERE ID = ${data.id}`,(err,DATA)=>{
    
  }) 
})

server.post('/get_daily',(req, res)=>{
  console.log("get daily")
  let data = req.body
  sql.queryAll(DBpath,`SELECT * FROM EMP_DATA WHERE ID = ${data.id} ORDER BY date ASC`,(err,DATA)=>{
    res.send(DATA)
  }) 
})



server.post('/insert_daily',(req,res)=>{
  console.log("insert daily")
  let data = req.body
  sql.queryAll(DBpath,`INSERT INTO EMP_DATA VALUES (${data.id},
    '${data.date}',
    ${data.rhsi},
    ${data.rmi},
    ${data.rq},
    ${data.cc},
    ${data.pp},
    ${data.kaizen})`,(err,DATA)=>{
    if(err) {if(err.errno === 19 ){ res.send({error : -1}) }else{ res.send({error : -2})}}
    else{ res.send({error : 0}) } 
  })
  // do NOT forget '' for VARCHAR inputs.
})


server.get('/ui',(req, res)=>{
  let database = {}
  setTimeout(()=>{
    sql.queryAll(DBpath,`SELECT * FROM EMPLOYEES`,(err,DATA)=>{
      database.EMPLOYEES = DATA
    })
  },100)
  setTimeout(()=>{
    sql.queryAll(DBpath,`SELECT * FROM EMP_DATA`,(err,DATA)=>{
      database.EMP_DATA = DATA
    })
  },200)

  setTimeout(()=>{
    res.send(database)
  },300)
})


server.listen(PORT,(name)=>{
    console.log(`Server is live on http://localhost:${PORT}`);
})



const fs = require('fs')

fs.readFile('client\\page\\MrBibek.png','base64',(err,data)=>{
  sql.queryAll(DBpath,`UPDATE EMPLOYEES SET image = '${data}' WHERE ID = 1`,(err,data)=>{
    if(err){throw err}
    console.log("Success")
  })
})


//fs.createWriteStream(imageName).write(imageBuffer);


// sql.queryAll(DBpath,`CREATE TABLE IF NOT EXISTS EMP_DATA (
//   id INT,
//   date DATE,
//   rhsi FLOAT,
//   rmi FLOAT,
//   rq FLOAT,
//   cc FLOAT,
//   pp FLOAT,
//   kaizen FLOAT,
//   PRIMARY KEY (id,date)
// )`,(err,DATA)=>{console.log("Success!")})



