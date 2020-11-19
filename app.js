const express=require('express')
const { Socket } = require('socket.io')
const app=express()
const server=require('http').createServer(app)
const io=require('socket.io')(server)

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

io.on('connection',(socket)=>{
    socket.on('chat message', (msg) => {
        io.emit('chat message','User: '+msg)
      });   
       socket.on('disconnect', () => {
        console.log('user disconnected');
      });
})


const PORT=process.env.PORT || 8080
server.listen(PORT,()=>{
    console.log('Connected on port: '+PORT)
})