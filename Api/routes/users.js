var express = require('express');
var router = express.Router();
const random = require('random');




router.post("/data", function (req, res) {
	var e = req.body.email;
	var n = req.body.name;
	console.log(e+" "+n);
	var id = random.int(0, 100);
	var query = "INSERT INTO person (name, id) VALUES ('"+n+"', "+id+")";

	connection.query(query, function (err, result) {
		if (err) throw err;
		console.log("1 record inserted");
		console.log(result);
	});

	var qt = "INSERT INTO user (roles_role, person_id) VALUES ('admin' ,"+id+")";

	connection.query(qt, function (err, result) {
		if (err) throw err;
		console.log("1 record inserted");
	});


	var sql = "INSERT INTO credentials (email, password, user_id) VALUES ('"+e+"', 'temp', "+id+")";
	connection.query(sql, function (err, result) {
		if (err) throw err;
		console.log("1 record inserted");
		res.send(JSON.stringify({"status": 200, "error": null, "response": result}));

	});
});

/* GET users listing. */
router.get('/', function(req, res, next) {
	connection.query('SELECT * from credentials as c left join user as u on c.user_id = u.person_id left join person as p on u.person_id = p.id', function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});




module.exports = router;
