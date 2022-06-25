var request = require('request-promise');

async function processrq(data) {

    // This variable contains the data
    // you want to send 
    // var data = {
    //     array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    // }

    var options = {
        method: 'POST',

        // http:flaskserverurl:port/route
        uri: 'http://127.0.0.1:5000/processrq',
        body: data,

        // Automatically stringifies
        // the body to JSON 
        json: true
    };

    return await request(options)

    // The parsedBody contains the data
    // sent back from the Flask server 
    .then(function(parsedBody) {
            console.log(parsedBody);

            // You can do something with
            // returned data
            let result = parsedBody['result'];
            console.log("Predict Result: ", result);
            return result
        })
        .catch(function(err) {
            console.log(err);
        });
    // console.log("talk" + result)
}

module.exports = {
    processrq
}