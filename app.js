//Modules Connected
const express=require('express')
var randomColor = require('randomcolor')
const app=express()
const PORT=process.env.PORT || 8080

app.use(express.static('public'))

// Creating server
const server=app.listen(PORT,(err,msg)=>{
    if(err)throw err;
    console.log(`[Server running on PORT:${PORT}]`)
})

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/chatf.html")
})

//Socket io part starts from here
const io=require('socket.io')(server)


const users=[]
const connections=[]

io.on('connection',(socket,name)=>{
    socket.on('new user',(name)=>{
        
        users.push({
            name: name,
            socketID: socket.id,
            color: randomColor()
        })
        if(name=='' || name==null){
            socket.broadcast.emit('broadcast','Stranger connected without a name...😈')
    }else{
        socket.broadcast.emit('broadcast',name+' successfully connected to chat room...👋');
        
    }
})
    
    socket.on('disconnect',()=>{
       let name;
        users.forEach((e)=>{
            if(e.socketID==socket.id){
                name=e.name
                users.splice(users.e,1)
            }
        })
        if(name=='' || name==null){
        socket.broadcast.emit('broadcast-dis', 'Stranger disconnected from chat...👹');
        }else{
            socket.broadcast.emit('broadcast-dis', name+' disconnected from chat...😧');
        }
    
    })
    socket.on('chat msg',(msg,name)=>{
        let color;
        users.forEach((e)=>{
            if(e.socketID==socket.id){
                return color=e.color
            }
        })
        io.emit('chat msg',msg,name,color)
    })

})
