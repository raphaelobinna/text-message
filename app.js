const express = require('express');
const ejs = require('ejs');
const Nexmo = require('nexmo');
const bodyParser = require('body-parser');
const socketio = require('socket.io');

//init nexmo
const nexmo = new  Nexmo({
    apiKey: '82083c6c',
    apiSecret: 'swYngjysUjbu8Y25'
}, {debug: true})

//init app
const app = express();

//Template engine setup
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

//public folder setup
app.use(express.static(__dirname + '/public'));

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//index route
app.get('/', (req, res) => {
    res.render('index')
});

//catch form input
app.post('/', (req, res) => {
   // res.send(req.body);
   // console.log(req.body);

   const number = req.body.number;
   const test = req.body.text;

    const from = 'Obinna';
    const to = number;
    const text = test;

nexmo.message.sendSms(from, to, text);
})

//set port
const PORT = 3000;

//start server
const server  = app.listen(PORT, () => console.log('test server has started'));

//connect to socket.io
const io = socketio(server);
io.on('connection', (socket) => {
    console.log('connected!');
io.on('disconnect', () => {
    console.log('Disconnected!')
});
});
//still going to find a use for socket.io