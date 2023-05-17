var express = require('express');
const fs = require('fs');
const path = require('path')
const bp = require('body-parser')

var app = express();
let student=""

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
 
app.get('/getstoreregister', function (req, res) {
	fs.readFile('../data.json', (err, data) => {
    if (err) throw err;
     student= JSON.parse(data);
     
     res.send(student);	
    
});
   
   
})
app.get('/index', function (req, res) {

res.sendFile(path.join(__dirname, '/index.html'));  
   
})

app.get('/aggrid.js', function (req, res) {

res.sendFile(path.join(__dirname, '/aggrid.js'));  
   
})

app.get('/led.css', function (req, res) {

res.sendFile(path.join(__dirname, '/led.css'));  
   
})
app.get('/table.js', function (req, res) {

res.sendFile(path.join(__dirname, '/table.js'));  
   
})

app.get('/numericCellEditor.js', function (req, res) {

res.sendFile(path.join(__dirname, '/numericCellEditor.js'));  
   
})


app.post('/data', function (req, res) {

 
 let file_to_write	 = JSON.stringify(req.body['lock_data']);

 	fs.writeFileSync('../data.json',file_to_write,err => {
    if (err) throw err;
    
    res.sendStatus(200);
   
    
});


 

})



var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})






