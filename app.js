var express=require('express');
var https=require('https');
var nodemailer=require('nodemailer');
var cron=require('node-cron');
var bodyParser=require('body-parser');
var mysql=require('mysql');
var app=express();
app.use(express.static("public"));
//app.use(express.static('view engine','ejs'));
app.use(bodyParser.urlencoded({extended:true}));

var con = mysql.createConnection({
    host: "localhost",
    user: "yourusername",
    password: "yourpassword"
  });

app.get('/',function(req,res){
    res.sendFile(__dirname+"/login.html");
});
app.post('/',function(req,res){
    let a=req.body.a;
    let b=req.body.b;
    if(a){
        res.redirect('/indexv');
    }
    else if(b)
    {
        res.redirect('/indexo');
    }
res.send("heloo");
});


app.get('/indexv',function(req,res){
    res.sendFile(__dirname+'/indexv.html');
});
app.post('/indexv',function(req,res){
    let a=req.body.a;
    let b=req.body.b;
    var emailv=req.body.email;
    let pass=req.body.pass;
    if(a){
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = "select * from Registered where EMAIL_ID like '%@email%'";
            con.query(sql, function (err, result, fields) {
            if (err) throw err;
            if(fields.PASSWORD===pass){
                res.redirect('/trail');}
            else{
                res.send("<h1>Given wrong credentials, please check</h1>");
            }
            });
        });
     }
     else if(b){
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = "INSERT INTO Registered (EMAIL_ID, PASSWORD) VALUES ('@email', '@pass')";
            con.query(sql, function (err, result) {
            if (err) throw err;
            alert('Now please login with credentials');
            res.redirect('/indexv');
            });
        });
     }
});


app.get('/indexo',function(req,res){
    res.sendFile(__dirname+'/indexo.html');
});
app.post('/indexo',function(req,res){
    let a=req.body.a;
    let b=req.body.b;
    var emailo=req.body.email;
    let pass=req.body.pass;
    if(a){
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = "select * from Owner where EMAIL_ID like '%@email%'";
            con.query(sql, function (err, result, fields) {
            if (err) throw err;
            if(fields.PASSWORD===pass){
                res.redirect('/trail');}
            else{
                res.send("<h1>Given wrong credentials, please check</h1>");
            }
            });
        });
     }
     else if(b){
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = "INSERT INTO Owner (EMAIL_ID, PASSWORD) VALUES ('@email', '@pass')";
            con.query(sql, function (err, result) {
            if (err) throw err;
            alert('Now please login with credentials');
            res.redirect('/indexo');
            });
        });
     }
});


app.get('/finalv',function(req,res){
    res.sendFile(__dirname+'/finalv.html');
});


app.get('/trail',function(req,res){
    res.sendFile(__dirname+'/trail.html');
});
app.post('/trail',function(req,res){
    let a = req.body.select_show;
    let b = req.body.booking_date;
    let c=req.body.age;
    if(c>3 && c<12){
        alert("50% discount for the kids aged between 3-12");
    }
    let mailOptions = {
        from: 'Theater_Owner@gmail.com',
        to: emailv,
        subject: 'Remainder on movie',
        text: 'Hi Sir/Madam,  Reminder on movie please come and enjoy the movie'
  };
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'Theater_Owner@gmail.com',
      pass: emailv
    }
    });
    if(a=='Morning Show'){
        cron.schedule('30 9 * * *', () => {
        // Send e-mail
        transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
          });
        });
    }
    else if(a=='Matinee Show'){
        cron.schedule('30 13 * * *', () => {
        // Send e-mail
        transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
          });
        });
    }
    else if(a=='First Show'){
        cron.schedule('30 17 * * *', () => {
        // Send e-mail
        transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
          });
        });
    }
    else if(a=='Second Show'){
        cron.schedule('* 21 * * *', () => {
        // Send e-mail
        transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
          });
        });
    }

});


app.listen(3000,function(){
    console.log('server started listening on port 3000');
});