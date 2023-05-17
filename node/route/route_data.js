var express = require('express');
const fs = require('fs');
var router = express.Router();
const path = require('path')

let student=""

router.route('/index')

	 .get(function (req, res) {
        
		res.sendFile(path.join(__dirname, 'index.html'));          

    });

router.route('/aggrid.js')

	 .get(function (req, res) {
	 	
		res.sendFile(path.join(__dirname, './aggrid.js'));          

    });

router.route('/led.css')

	 .get(function (req, res) {
	 	
		res.sendFile(path.join(__dirname, './led.css'));          

    });	

router.route('/table.js')

	 .get(function (req, res) {
	 	
		res.sendFile(path.join(__dirname, './table.js'));          

    });	

router.route('/numericCellEditor.js')

	 .get(function (req, res) {
	 	
		res.sendFile(path.join(__dirname, './numericCellEditor.js'));          

    });	


router.route('/getstoreregister')

     	 .get(function (req, res) {
	 	
			fs.readFile('../data.json', (err, data) => {
    if (err) throw err;
     student= JSON.parse(data);
     
     res.send(student);	
    
});      
});	



router.route('/data')

     	 .post(function (req, res) {
	 	
 let file_to_write	 = JSON.stringify(req.body['lock_data']);

 	fs.writeFileSync('../data.json',file_to_write,err => {
    if (err) throw err;
    
    res.sendStatus(200);
   
    
});
});	

module.exports = router;