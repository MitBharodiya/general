const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const socketio = require('socket.io');
const server =http.createServer(app);
const io = socketio(server);

app.set("view engin","ejs");
app.set(express.static(path.join(__dirname,"public")))

io.on("connection",function(socket){
    console.log("Connected");
})

app.get("/demo",(req,res)=>{
    console.log("its home page");    
    res.send("its home page");    
});


server.listen(3000,()=>{
    console.log("app is listen on port 3000");
})