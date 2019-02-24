//import of the different packages
var express       = require('express');
var bodyParser    = require("body-parser");
var request       = require('request');

var app = express();

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({ extended: true}));

//listen on local port 8080
app.listen(8080);

//Login page
app.get('/Login.html', function(req, res) {
    res.sendFile(__dirname + '/Login.html')
});

//request to interact.io when the user is log
app.post('/post.html',function(req,res){
    var email=req.body.email;
    var password=req.body.password;
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
    if(response.statusCode>=200 && response.statusCode<400){
        authToken_user=body.token.authToken; //getting the user token
        return res.redirect('/contact_list.html'); //redirection to the page with contacts
    }

    else{res.redirect('/Login.html');}
});

})

//request to interact.io to get the user's contacts
app.get('/contacts', function(req, res){
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
        if(response.statusCode>=200 && response.statusCode<400){
            console.log('cc');
            res.send(body);
            
        }
    });
});


//request to interact.io to log out
app.post('/logout.html',function(req,res){

    const options={
        url    : 'https://internal-api-staging-lb.interact.io/v2/logout',
        json   : true,
        method : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept'      : 'application/json'
      },
      body   : {
          authToken: authToken_user
      }
  }  


  request(options,function callback_login(error, response, body) {
    if(response.statusCode>=200 && response.statusCode<400){
        console.log(response.statusCode);
        console.log(body);
        return res.redirect('/Login.html');
    }

});
});