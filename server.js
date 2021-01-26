var cors = require('cors');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(cors());
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('dispatch', (data) => {
        io.emit(data.driver.emp_id, data)

    });
});


http.listen(3002, () => {
    console.log('listening on *:3002');
});