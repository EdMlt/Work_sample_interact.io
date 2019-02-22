//import of the different middlewares
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var express       = require('express');
var bodyParser    = require("body-parser");
var request       = require('request');
var cheerio       = require('cheerio');
var fs            = require('fs');

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

//https://internal-api-staging-lb.interact.io/v2/admin/billing/details

//request to interact.io
app.post('/post.html',function(req,res){
    /*var email=req.body.email;
    var password=req.body.password;*/

    const options={
        url    : 'https://internal-api-staging-lb.interact.io/v2/login',
        json   : true,
        method : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept'      : 'application/json'
      },
      body   : {
          "username": email,
          "password": password,
          "client"  : ""
      }
  }  


  request(options,function callback_login(error, response, body) {
    if(response.statusCode>=200||response.statusCode<400){
        console.log(body.token.authToken);
        authToken_user=body.token.authToken;
        return res.redirect('/contact_list.html');
        }

});

})
app.get('/contacts', function(req, res){
    console.log('getcontaccts')
    const contact_request={
            url    : 'https://vault-staging-lb.interact.io/api/contacts/list',
            json   : true,
            method : 'POST',
            headers: {
                authToken: authToken_user,
                'Content-Type': 'application/json;charset=UTF-8',
                'Accept'      : 'application/json;charset=UTF-8'
            },
            body:{}
            
        }
        request(contact_request,function callback_login(error, response, body) {
            if(response.statusCode>=200||response.statusCode<400){
                console.log('cc')
        res.send(body);
            
        }
    })
