var postcss = require('postcss');
var assign = require('object-assign');
var postcssImport = require('postcss-import');
var resolveGlob = require('./lib/resolve-glob.js');
var resolveModule = require('./lib/resolve-module.js');
var resolveDynamic = require('./lib/resolve-dynamic.js');

module.exports = postcss.plugin('postcss-easy-import', function (opts) {
    opts = assign({
        prefix: false,
        extensions: '.css',
        glob: false,
        dynamicResolve: false
    }, opts);

    if ( opts.glob ) {
        opts.resolve = resolveGlob;
    } else if ( opts.dynamicResolve ) {
        opts.resolve = resolveDynamic;
    } else {
        opts.resolve = resolveModule;
    }

    if (opts.prefix && typeof opts.prefix !== 'string') {
        throw Error(
            'postcss-easy-import: ' +
            '\'prefix\' option should be a string or false'
        );
    }

    if (typeof opts.extensions === 'string') {
        opts.extensions = [opts.extensions];
    }

    var extensions = opts.extensions;
    if (
        !Array.isArray(extensions) ||
        !extensions.length ||
        extensions.filter(function (ext) {
            return ext && typeof ext === 'string';
        }).length !== extensions.length
    ) {
        throw Error(
            'postcss-easy-import: ' +
            '\'extensions\' option should be string or array of strings'
        );
    }

    return postcss([postcssImport(opts)]);
});
