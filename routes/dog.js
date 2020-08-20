var _ = require('lodash');
// const { functions } = require('lodash');
var Dog = require('../models/dog_model.js');

module.exports = function(app) {

    // _dogs = [];

    /* Create */
    app.post('/dog', function (req, res) {
        var newDog = new Dog(req.body);
        // _dogs.push(req.body);
        newDog.save(function(err) {
            if (err) {
                res.json({info: 'error during dog create', error: err});
            };
            res.json({info: 'dog created successfully'});
        });
    });

    /* Read */
    app.get('/dog', function (req, res) {
        // res.send(_dogs);
        Dog.find(function(err, dogs) {
            if (err) {
                res.json({info: 'error during find dogs', error: err});
            };
            // res.json({info: 'dogs found successfully', data: dogs});
            setTimeout(function(){
                res.json({info: 'dogs found successfully', data: dogs});
            }, 10000);
        });
    });

    app.get('/dog/:id', function (req, res) {
        // res.send(_.find(_dogs, { name: req.params.id}));
        Dog.findById(req.params.id, function(err, dog) {
            if (err) {
                res.json({info: 'error during find dog', error: err});
            };
            if (dog) {
                // res.json({info: 'dog found successfully', data: dog});
                setTimeout(function(){
                    res.json({info: 'dog found successfully', data: dog});
                }, 10000);
            } else {
                res.json({info: 'dog not found'});
            }
        });
    });

    /* Update */
    app.put('/dog/:id', function (req, res) {
        // var index = _.findIndex(_dogs, {name: req.param.id});
        // _.merge(_dogs[index],req.body);
        // res.json({info: "dog successfully updated"});
        Dog.findById(req.params.id, function(err, dog) {
            if (err) {
                res.json({info: 'error during find dog', error: err});
            };
            if (dog) {
                _.merge(dog, req.body);
                dog.save(function(err) {
                    if (err) {
                        res.json({info: 'error during dog update', error: err});
                    };
                    res.json({info: 'dog updated successfully'});
                });
            } else {
                res.json({info: 'dog not found'});
            }

        });
    });

    /* Delete */
    app.delete('/dog/:id', function (req, res) {
        // _.remove(_dogs, function(dog) {
        //     return dog.name === req.params.id;
        // });
        // res.json({info: "dog successfully deleted"});
        Dog.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.json({info: 'error during remove dog', error: err});
            };
            res.json({info: 'dog removed successfully'});
        });
    });

    /* ping */
    app.get('/ping', function(req, res) {
        res.json({pong: Date.now()})
    });
};