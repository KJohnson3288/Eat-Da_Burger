var express = require("express");
var burgers = require("../models/burgers");

var router = express.Router();

router.get("/", function(req, res) {
    burgers.selectAll(function(data) {
        var allObject = 
        {
            burgers: data
        };

        res.render("index", allObject);
    });
});

router.post("/api/burgers", function(req, res) {
    burgers.insertOne(
    [
        "burger_name"
    ], 
    [
        req.body.burger_name
    ], 
    
    function(result) {
            res.json({id: result.insertID});
    });
});

router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    burgers.updateOne(
        {devoured: req.body.devoured}, condition, function(result) {
        if (result.changedRows === 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});
    
module.exports = router;