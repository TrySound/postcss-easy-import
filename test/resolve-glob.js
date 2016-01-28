import test from 'ava';
import path from 'path';
import resolveGlob from '../lib/resolve-glob.js';

const resolve = p => path.resolve('fixtures/glob', p);

test('should resolve relative globs', t => {
    return resolveGlob('relative.*', path.resolve('fixtures/glob'), {
        extensions: ['.css', '.scss'],
        path: []
    }).then(result => {
        t.same(result, [
            'relative.bar.scss',
            'relative.foo.css'
        ].map(resolve));
    });
});

test('should resolve globs without magic and extension', t => {
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

test('should resolve globs in paths', t => {
    return resolveGlob('path.*', path.resolve('fixtures/glob'), {
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

test('should not resolve globs with empty extensions', t => {
    return resolveGlob('{path,relative}.*', path.resolve('fixtures/glob'), {
        extensions: [],
        path: [
            'path-1',
            'path-2'
        ].map(resolve)
    }).then(result => {
        t.is(result.length, 0);
    });
});

test('should resolve prefix', t => {
    return resolveGlob('prefixed/prefix.*', path.resolve('fixtures/glob'), {
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
