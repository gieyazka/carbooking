var cors = require('cors');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http, {
    cors: {
        origin: '*',
    }
});

app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
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