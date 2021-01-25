var cors = require('cors');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(cors());
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => { // chanel

    // console.log('a user connected');
    socket.on('dispatch', (data) => {
        // console.log(data.driver.emp_id);
        // io.emit(res.username,data)
        // io.emit('sendData', data)
        io.emit(data.driver.emp_id, data)

    });

    // user.map(res => {
    //     socket.on(res.username, (data) => {
    //         console.log(data);
    //         // io.emit(res.username,data)
    //         io.emit('sendData',data)
    //     });
    // })

});


http.listen(3002, () => {
    console.log('listening on *:3002');
});