import test from 'ava';
import path from 'path';
import resolveGlob from '../lib/resolve-glob.js';
import resolveDynamic from '../lib/resolve-dynamic.js';

const resolve = p => path.resolve('fixtures/glob', p);
const resolvesToTest = [
    { name: 'resolveGlob', resolve: resolveGlob },
    { name: 'resolveDynamic', resolve: resolveDynamic }
];

// Test with both Glob resolve only
test('should resolve globs without magic and extension with resolveGlob', t => {
    return resolveGlob('ext', path.resolve('fixtures/glob'), {
        extensions: ['.css', '.scss'],
        path: []
    }).then(result => {
        t.same(result, [
            'ext.css',
            'ext.scss'
        ].map(resolve));
    });
});

// Test with both Glob and Dynamic resolves
resolvesToTest.forEach( tested => {

    test('should resolve relative globs with ' + tested.name, t => {
        return tested.resolve('relative.*', path.resolve('fixtures/glob'), {
            extensions: ['.css', '.scss'],
            path: []
        }).then(result => {
            t.same(result, [
                'relative.bar.scss',
                'relative.foo.css'
            ].map(resolve));
        });
    });

    test('should resolve globs in paths with ' + tested.name, t => {
        return tested.resolve('path.*', path.resolve('fixtures/glob'), {
            extensions: ['.css', '.scss'],
            path: [
                'path-1',
                'path-2'
            ].map(resolve)
        }).then(result => {
            t.same(result, [
                'path.0.css',
                'path-1/path.1-1.css',
                'path-1/path.1.3.scss',
                'path-2/path.2.css',
                'path-2/path.2.scss'
            ].map(resolve));
        });
    });

    test('should not resolve globs with empty extensions with ' + tested.name, t => {   // eslint-disable-line max-len
        return tested.resolve('{path,relative}.*', path.resolve('fixtures/glob'), {     // eslint-disable-line max-len
            extensions: [],
            path: [
                'path-1',
                'path-2'
            ].map(resolve)
        }).then(result => {
            t.is(result.length, 0);
        });
    });

    test('should resolve prefix with ' + tested.name, t => {
        return tested.resolve('prefixed/prefix.*', path.resolve('fixtures/glob'), {     // eslint-disable-line max-len
            extensions: ['.css', '.scss'],
            path: [],
            prefix: '_'
        }).then(result => {
            t.same(result, [
                'prefixed/_prefix.foo.css',
                'prefixed/_prefix.foo.scss'
            ].map(resolve));
        });
    });
});
