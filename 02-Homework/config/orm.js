//Dependencies
var connection = require("./connection");


//Function for SQL syntax
function printQuestionMarks(input) {
    var array = [];

    for (var i = 0; i < input; i++) {
        array.push("?");
    }

    return array.toString()
}

//Function to convert key/value pairs
function objToSql(obj) {
    var arr = [];

    for (var key in obj) {
        var value = obj[key];

        if (Object.hasOwnProperty.call(obj, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);

        }
            return arr.toString();
    }
}


//ORM Functions
var orm = {
    selectAll: function(tableInput, cb) {
        var qs = "SELECT * FROM " + tableInput + ";";
        connection.query(qs, function(err, results) {
            if (err) {
                throw err
            }
            cb(results);
        });
    },
    insertOne: function(table, cols, vals, cb) {
        var qs = "INSERT INTO " + table;
        qs += " (" + cols.toString() + ") VALUES (";
        qs += printQuestionMarks(vals.length) + ") ";
        console.log(qs);

        connection.query(qs, vals, function(err, results) {
            if (err) {
                throw err;
            }
            cb(results);
        })

    },
    updateOne: function(table, objColVals, condition, cb) {
        var qs = "UPDATE " + table + " SET ";
        qs += objToSql(objColVals) + " WHERE " + condition;
        console.log(qs);

        connection.query(qs, function(err, results) {
            if (err) {
                throw err
            }

            cb(results);
        })
    }
}

module.exports = orm;
