
import express from 'express'
const app = express()
import http from 'http'
const httpServer = http.createServer(app)
import { Server, Socket } from 'socket.io'
import path from 'path'
const __dirname = path.resolve()

const io = new Server(httpServer)

app.get('/', function (request, response) {
    response.sendFile(__dirname + '/index.html')
}) 

httpServer.listen(3000, () => {
    console.log('listening on *:3000')
})

const users = []
const connections = []

io.sockets.on('connection', socket =>{
    console.log('Connected good')
    connections.push(socket)

    socket.on('disconnect', data =>{
        connections.splice(connections.indexOf(socket), 1)
        console.log('Disconnected good')
    })
    
    socket.on('send mess', data => {
        console.log('send mess detected')
        io.sockets.emit('add mess', {msg: data})
    })
})  //listen event connection

