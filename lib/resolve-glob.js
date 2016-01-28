var path = require('path');
var globby = require('globby');
var addPrefix = require('./add-prefix.js');
var hasPrefix = require('./has-prefix.js');
var hasExtensions = require('./has-extensions.js');

module.exports = function resolveGlob(id, base, opts) {
    var prefix = opts.prefix;
    var extensions = opts.extensions;
    var paths = [base].concat(opts.path);
    var patterns = [];
    var prefixedId = prefix ? addPrefix(id, prefix) : null;

    paths.forEach(function (p) {
        [''].concat(extensions).forEach(function (ext) {
            if (prefix) {
                patterns.push(path.resolve(p, prefixedId + ext));
            }
            patterns.push(path.resolve(p, id + ext));
        });
    });

    return globby(patterns).then(function (files) {
        return files.filter(function (file) {
            return hasExtensions(file, extensions) &&
                (!prefix || hasPrefix(file, prefix));
        }).map(function (file) {
            return path.normalize(file);
        });
    });
};
