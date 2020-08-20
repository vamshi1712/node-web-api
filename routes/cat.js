var _ = require('lodash');
// const { functions } = require('lodash');
var Cat = require('../models/cat_model.js');

module.exports = function(app) {

    // _cats = [];

    /* Create */
    app.post('/cat', function (req, res) {
        var newCat = new Cat(req.body);
        // _cats.push(req.body);
        newCat.save(function(err) {
            if (err) {
                res.json({info: 'error during cat create', error: err});
            };
            res.json({info: 'cat created successfully'});
        });
    });

    /* Read */
    app.get('/cat', function (req, res) {
        // res.send(_cats);
        Cat.find(function(err, cats) {
            if (err) {
                res.json({info: 'error during find cats', error: err});
            };
            res.json({info: 'cats found successfully', data: cats});
        });
    });

    app.get('/cat/:id', function (req, res) {
        // res.send(_.find(_cats, { name: req.params.id}));
        Cat.findById(req.params.id, function(err, cat) {
            if (err) {
                res.json({info: 'error during find cat', error: err});
            };
            if (cat) {
                // res.json({info: 'cat found successfully', data: cat});
                setTimeout(function(){
                    res.json({info: 'cat found successfully', data: cat});
                }, 10000);
            } else {
                res.json({info: 'cat not found'});
            }
        });
    });

    /* Update */
    app.put('/cat/:id', function (req, res) {
        // var index = _.findIndex(_cats, {name: req.param.id});
        // _.merge(_cats[index],req.body);
        // res.json({info: "cat successfully updated"});
        Cat.findById(req.params.id, function(err, cat) {
            if (err) {
                res.json({info: 'error during find cat', error: err});
            };
            if (cat) {
                _.merge(cat, req.body);
                cat.save(function(err) {
                    if (err) {
                        res.json({info: 'error during cat update', error: err});
                    };
                    res.json({info: 'cat updated successfully'});
                });
            } else {
                res.json({info: 'cat not found'});
            }

        });
    });

    /* Delete */
    app.delete('/cat/:id', function (req, res) {
        // _.remove(_cats, function(cat) {
        //     return cat.name === req.params.id;
        // });
        // res.json({info: "cat successfully deleted"});
        Cat.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.json({info: 'error during remove cat', error: err});
            };
            res.json({info: 'cat removed successfully'});
        });
    });

    /* ping */
    app.get('/ping', function(req, res) {
        res.json({pong: Date.now()})
    });
};