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