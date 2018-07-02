const express = require('express');
const bodyParser = require('body-parser');

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);

app.post('/api/digital/confirm/order', function(req,res){
	
	console.log('handling request on /api/digital/confirm/order');
	
// expected input:
//	{  "orderId":"orderId11",
//	   "httpStatus":"httpStatus11",
//	   "errorCode":"errorCode11",
//	   "cvv":"3243211",
//	   "expDate":"expDate11",
//	   "nameOnCard":"nameOnCard11",
//	   "cardNumber":"12345678912345678912"
//	}
//      If length of cardNumber == 20 then response will be {"status":"success"} with 200 as HTTPSTATUS code
//      Otherwise  response will be {"status":"failed","errorCode":"INVALID_CARD_NUMBER","category":"USER"} with 400 as HTTPSTATUS code
	
// actual input as viewed from lastest code:
//  { "reqestBody": [ 
//	    {  "orderId":"orderId11",
//	       "httpStatus":"httpStatus11",
//	       "errorCode":"errorCode11",
//	       "cvv":"3243211",
//	       "expDate":"expDate11",
//	       "nameOnCard":"nameOnCard11",
//	       "cardNumber":"12345678912345678912"
//	    }
//    ]
//  }
	
	
	var success_json = {"status": "success"};
	var fail_json = {"status":"failed","errorCode":"INVALID_CARD_NUMBER","category":"USER"};
	
	var requestBody = req.body.reqestBody;  // NOTE!!!! This is the speling that was in the cloud-poc call
	var orderDetails = requestBody[0];
	if( orderDetails.cardNumber && orderDetails.cardNumber.length==20 ){
		console.log("SUCCESS: " + JSON.stringify(orderDetails) );
		res.status(200).json(success_json);
	} else {
		console.log("FAILED: " + JSON.stringify(orderDetails) );
		res.status(400).json(fail_json);
	}

});



app.listen(app.get('port'), '0.0.0.0', function() {
	  console.log("server starting on port " + app.get('port'));
});



	