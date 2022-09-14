if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const route = require('./routes/router')
const app = express()
const http = require('http')
const { Server } = require('socket.io')
const errorHandler = require('./middlewares/errorHandler')
const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", 'OPTIONS']
  }
})

io.on('connection', (socket) => {
  console.log(`user ${socket.id} is connected`)

  socket.on('message', (data) => {
    socket.broadcast.emit('message:received', data)
  })

  socket.on('disconnect', () => {
    console.log(`user ${socket.id} left`)
  })
})

app.use(route)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`app listen on port ${port}`)
})