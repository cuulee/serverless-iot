'use strict';

var https = require('https');

module.exports.hello = (event, context, callback) => {

    var errMsg;
    var url = process.env.WEBHOOK_URL;
    var version = event.body.version;
    if (typeof url !== "string") {
        errMsg = "[401] must provide a 'WEBHOOK_URL' env variable";
        return callback(new Error(errMsg));
    }

    console.log("---------------------------------");
    console.log("Web hook is called");
    console.log("New version is : " + version);
    console.log("---------------------------------");

    var options = {
        host: url,
        port: 443,
        path: '/upgrade?version=' + version,
        // authentication headers
        headers: {
            'Authorization': 'Basic ' + new Buffer('jfrog:WonderWomen').toString('base64')
        },
        method: 'POST'
    };
    //this is the call
    var post_req = https.request(options, function (res) {
        console.log('statusCode:', res.statusCode);
        res.on('data', function (chunk) {
            console.log('Response: ' + chunk);
        });
    });
    post_req.on('error', function (error) {
        errMsg = error;
        console.log('Error: ' + error);
    });
    post_req.end();

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Upgrade to version: '+ version +' Triggered ',
      input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
