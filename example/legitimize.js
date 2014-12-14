var Legitimize = require(/*"legitimize"*/"../src/Legitimize");

var defaults = {
    type: "string"
};

var validate = new Legitimize({
    name: {
        required: true,
        pattern: /[a-z]+/i
    },
    town: {
        required: true
    },
    age: {
        type: "integer",
        error: "'age' must be an integer that is between 0 and 120",
        use: function(value) { return (value >= 0 && value <= 120); }
    },
    color: {
        within: ["red", "green", "blue"]
    }
}, defaults);

var invalid = validate({
    name: "Lewis Barnes",
    town: 5,
    age: "four hundred",
    color: "myColour"
});

// returns 'town' must have a data type of string
console.log(invalid);

var invalid = validate({
    name: "Lewis Barnes",
    town: "Manchester",
    age: 20,
    color: "blue"
});

// returns null
console.log(invalid);