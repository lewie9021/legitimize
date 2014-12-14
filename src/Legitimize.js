var FS = require("fs");

function Legitimize(scheme, defaults) {
    this.scheme = (scheme || {});
    this.defaults = (defaults || {});

    return validate.bind(this);
}

function validate(object) {
    for (var property in this.scheme) {
        var rule = this.scheme[property];
        var required = (rule.required || this.defaults.required);
        var pattern = (rule.pattern || this.defaults.pattern);
        var within = (rule.within || this.defaults.within);
        var error = (rule.error || this.defaults.error);
        var type = (rule.type || this.defaults.type);
        var use = (rule.use || this.defaults.use);
        var value = object[property];

        if (typeof object[property] === "undefined") {
            if (required) { return (error || ("'" + property + "' is required")); }
            continue;
        }

        if (type && !checkType(type, object[property])) {
            return (error || ("'" + property + "' must have a data type of " + type));
        }

        if (pattern && checkType("regex", pattern) && !pattern.test(value)) {
            return (error || ("'" + property + "' failed to pass regular expression pattern"));
        }

        if (within && checkType("array", within) && within.indexOf(value) == -1) {
            return (error || ("'" + property + "' was not found in the list"));
        }

        if (use && checkType("function", use) && !use(value)) {
            return error;
        }
    }

    return null;
};

function checkType(type, value) {
    switch (type) {
        case "decimal":  return (isNumber(value) && /^(\-?)\d+(\.\d+)?$/.test(value)); break;
        case "path":     return (typeof value === "string" && FS.existsSync(value)); break;
        case "integer":   return (isNumber(value) && /^(\-?)\d+$/.test(value)); break;
        case "boolean":  return (typeof value === "boolean"); break;
        case "string":   return (typeof value === "string"); break;
        case "object":   return (typeof value === "object"); break;
        case "function": return value instanceof Function; break;
        case "regex":    return value instanceof RegExp; break;
        case "array":    return value instanceof Array; break;
        case "number":   return isNumber(value); break;
    }

    throw new Error("Invalid data type specified");
}

function isNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

module.exports = Legitimize;
