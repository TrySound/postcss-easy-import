var fs = require('fs');
var path = require('path');
var pify = require('pify');
var resolve_ = require('resolve');
var resolve = pify(resolve_);
var addPrefix = require('./add-prefix.js');
var hasExtensions = require('./has-extensions.js');

module.exports = function (id, base, opts) {
    var prefixedId = opts.prefix ? addPrefix(id, opts.prefix) : id;
    var extensions = opts.extensions;
    var resolveOpts = {
        basedir: base,
        extensions: extensions,
        moduleDirectory: [
            'node_modules',
            'web_modules'
        ],
        isFile: function (file, cb) {
            if (
                path.basename(file) !== 'package.json' &&
                !hasExtensions(file, extensions)
            ) {
                return cb(null, false);
            }
            fs.stat(file, function (err, stat) {
                if (err && err.code === 'ENOENT') {
                    cb(null, false);
                } else if (err) {
                    cb(err);
                } else {
                    cb(null, stat.isFile());
                }
            });
        },
        paths: opts.path,
        pakageFilter: function (pkg) {
            if (pkg.style) {
                pkg.main = pkg.style;
            } else if (!pkg.main || !hasExtensions(pkg.main, extensions)) {
                pkg.main = 'index.css';
            }
            return pkg;
        }
    };

    return resolve('./' + prefixedId, resolveOpts).catch(function () {
        return resolve(prefixedId, resolveOpts);
    });
};
