# Legitimize

Legitimize is a simple and flexible object validator. It can be useful for validating JSON objects or to simply ensure an options parameter contains valid values.

### Install

```
npm install legitimize
```

### Quick Start

It is relatively simple to use legitimize. Simply require the module, create a scheme and it's returned value will be the validation function. You may also pass a second parameter that is an object of default property rules.

```javascript
var Legitimize = require("legitimize");

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
```

This example object will return an error on many accounts but will return the first error it has encounted. 'town' should be a string, 'age' should be an integer that's between 0 and 120, and lastly color is a string (from the default rules object) but is not either 'red', 'green', or 'blue'.
```javascript
var invalid = validate({
    name: "Lewis Barnes",
    town: 5,
    age: "four hundred",
    color: "myColour"
});

// returns 'town' must have a data type of string
console.log(invalid);
```

This object is a revised copy of the previous example with changes made to the town, age, and color properties. Since there are no errors, it returns null.
```javascript
var invalid = validate({
    name: "Lewis Barnes",
    town: "Manchester",
    age: 20,
    color: "blue"
});

// returns null
console.log(invalid); 
```

### Supported Property Rules

- **required** - If true, the property must be present within the object.
- **type** - Defines the data type of the property. For information see 'Supported Data Types'.
- **pattern** - Tests the value against a regular expression pattern.
- **within** - Searches an array of items for the property value.
- **use** - Allows custom validation via a function. This function is passed a single parameter that is the value of the property. The returned value of the function will dictate if the value is valid.

### Supported Data Types

- string
- number
- object
- array
- boolean
- function
- regex
- path
- decimal
- integer

### Future Improvements

- Add comments to the code.
- Make use of a testing framework.
- Revise README 'Supported Data Types' to demonstrate examples of the data type.

### Changelog
<dl>
    <dt>v0.0.2</dt>
    <dd>
        <ul>
            <li>Added 'within' property rule.</li>
            <li>The validate function now returns null when valid.</li>
            <li>Updated README to include documentation.</li>
            <li>Added an example code.</li>
        </ul>
    </dd>
</dl>

### Licence
Copyright (c) 2014 Lewis Barnes. See LICENSE for details.