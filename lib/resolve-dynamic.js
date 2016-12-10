var isGlob = require('is-glob');
var resolveGlob = require('./resolve-glob.js');
var resolveModule = require('./resolve-module.js');

module.exports = function resolveDynamic(id, base, opts) {

    if (isGlob(id)) {
        return resolveGlob(id, base, opts);
    } else {
        return resolveModule(id, base, opts);
    }
};
