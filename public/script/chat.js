let name=prompt('Your name please')
document.getElementById('m').focus()

let socket = io();
socket.emit('new user',name)

socket.on('broadcast',(msg,name)=>{
let text=document.createElement('li')
text.setAttribute('class','alert alert-success')
text.innerText=`${msg}`
document.getElementById('messages').append(text)
document.getElementById('chat').scrollTo(0,document.getElementById('chat').scrollHeight)
})
socket.on('broadcast-dis',(msg,name)=>{
let text=document.createElement('li')
text.setAttribute('class','alert alert-danger')
text.innerText=`${msg}`
document.getElementById('messages').append(text)
document.getElementById('chat').scrollTo(0,document.getElementById('chat').scrollHeight)   
})

document.querySelector('form').addEventListener('submit',(e)=>{
e.preventDefault()
if(document.getElementById('m').value.length==0){
   return false
}
socket.emit('chat msg',document.getElementById('m').value,name)
document.getElementById('m').value="" 
})

socket.on('chat msg',(msg,name,color)=>{

let text=document.createElement('li')
text.setAttribute('class','list-group-item border border-primary')
text.setAttribute('style','margin-top: 0.4rem;')
text.innerHTML=`<span style="color:${color}">${name}</span>: ${msg}`
document.getElementById('messages').append(text)
document.getElementById('chat').scrollTo(0,document.getElementById('chat').scrollHeight)
})
