const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const bodyParser = require('body-parser');

const {Server}= require("socket.io");
const io = new Server(server)

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
  res.sendFile(__dirname+"/home.html")
})

app.post('/',(req,res)=>{
  console.log(req.body)
  res.render('welcome',{userName:req.body.name})
  // res.redirect('/connected')
})

app.get('/connected',(req,res)=>{
  // res.render('welcome',{user:user})
})

io.on('connection',(socket)=>{ 
  let username;
  socket.on('new user',newusername=>{
    username=newusername
    console.log(`${username} connected`)
  })
  console.log(`a user connected`)

  socket.on('disconnect',()=>{
    console.log(`${username} disconnected`)
  })

  socket.on('chat message',(msg)=>{
    console.log(`${username}:` + msg);
    
    io.emit('chat message', (`${username}:` + msg))
  })
})








server.listen(3000,()=>{
  console.log('listening on port 3000')
})
