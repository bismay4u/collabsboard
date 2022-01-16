const express = require('express')
const path = require('path');
const app = express()
var http = require('http').createServer(app)
var io = require('socket.io')(http)

const port = 9171
const host = 'localhost'

app.use(express.static(path.join(__dirname, 'public')))
app.use('/files', express.static(path.join(__dirname, 'files')))

// app.get('/api', (req, res) => {
//     res.send('Hello World!')
// })

http.listen(port, host, () => console.log(`CollabsBoard has started on ${port}!`))


io.on('connection', function(socket) {
    socket.on("message", function(data) {
        io.emit(data.type, data);
    });
});
