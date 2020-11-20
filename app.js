//Modules Connected
const express=require('express')
const app=express()
const PORT=process.env.PORT || 8080

// Creating server
const server=app.listen(PORT,(err,msg)=>{
    if(err)throw err;
    console.log(`[Server running on PORT:${PORT}]`)
})

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/chat.html")
})

//Socket io part starts from here
const io=require('socket.io')(server)


const users=[]
const connections=[]

io.on('connection',(socket,name)=>{
    socket.on('new user',(name)=>{
        users.push(name)
        socket.broadcast.emit('broadcast', users[users.length-1]+' :joined to chat');
    })
    
    socket.on('disconnect',()=>{
        socket.broadcast.emit('broadcast', 'Disconnected from chat');
    })
    socket.on('chat msg',(msg,name)=>{
        io.emit('chat msg',msg,name)
    })

})

