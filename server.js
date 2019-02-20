//import of the different middlewares
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var express       = require('express');
var bodyParser    = require("body-parser");
var request       = require('request');

var app = express();

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(passport.initialize());
app.use(passport.session());

app.listen(8080);

//Login page
app.get('/Login.html', function(req, res) {
    //res.setHeader('Content-Type', 'text/html');
    res.sendFile(__dirname + '/Login.html')
});

//Contacts page
app.get('/contacts_list.html', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.sendFile(__dirname + '/contacts_list.html')

});

//request to interact.io
app.post('/contacts_list.html',function(req,res){
    console.log('cc');
    var email=req.body.email;
    var password=req.body.password;
    const options={
        url: 'https://internal-api-staging-lb.interact.io/v2/login',
        json:true,
        method: 'POST',
        headers:{'Content-Type':'application/json',
                 'Accept': 'application/json'},
        body:{"username": email,
              "password": password,
              "client":""}
             }


    request(options,function(error, response, body) {
    console.log(body);
    });
})
