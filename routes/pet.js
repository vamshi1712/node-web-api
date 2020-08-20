const { rejectSeries } = require('async');

var r = require('request').defaults({
    json:true
});

var async = require('async');
var redis = require('redis');

//get redis client
var client = redis.createClient({host:`127.0.0.1`, port:`6379`});
client.set(["some other key", "some val"]);

module.exports = function(app) {

    app.get('/pets', function (req, res) {

        async.parallel({
            cat: function(callback) {
                r({uri:'http://127.0.0.1:3000/cat'}, function (error, response, body) {
                    if (error){
                        callback({service: 'cat', error: error});
                    };
                    if (!error && response.statusCode === 200 ) {
                        callback(null, body.data);
                    } else {
                        callback(response.statusCode);
                    }
                });
            },

            dog: function(callback) {
                client.get('http://127.0.0.1:3001/dog', function(error, dog) {
                    if(error) {throw error;}
                    if(dog) {
                        callback(null, JSON.parse(dog))
                    } else {
                        r({uri:'http://127.0.0.1:3001/dog'}, function (error, response, body) {
                            if (error){
                                callback({service: 'dog', error: error});
                            };
                            if (!error && response.statusCode === 200 ) {
                                callback(null, body.data);
                                client.set('http://127.0.0.1:3001/dog', JSON.stringify(body.data), function(error, response){
                                    if(error) {throw error;}
                                });
                            } else {
                                callback(response.statusCode);
                            }
                        });
                    }
                });
                
            }
        },
        function(error, results)  {
            /* should not do this... blocks other processes link /ping */
            // var x = 0;
            // var y = 0;
            // for (x = 0; x <10000000; x++){
            //     y = y + x;
            // }
            // console.log(y)
            res.json({
                error: error,
                results: results
            });
        });
    });

    app.get('/ping', function(req, res) {
        res.json({pong: Date.now()})
    });
}