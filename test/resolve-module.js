import test from 'ava';
import path from 'path';
import resolveModule from '../lib/resolve-module.js';
import resolveDynamic from '../lib/resolve-dynamic.js';

const resolve = p => path.resolve('fixtures/module', p);
const resolvesToTest = [
    { name: 'resolveModule', resolve: resolveModule },
    { name: 'resolveDynamic', resolve: resolveDynamic }
];

// Test with both Module and Dynamic resolves
resolvesToTest.forEach( tested => {

    test('should resolve file (css) with: ' + tested.name, t => {
        return tested.resolve('index', path.resolve('fixtures/module'), {
            extensions: ['.css', '.scss']
        }).then(result => {
            t.is(result, resolve('index.css'));
        });
    });

    test('should resolve file (scss) with: ' + tested.name, t => {
        return tested.resolve('index', path.resolve('fixtures/module'), {
            extensions: ['.scss', '.css']
        }).then(result => {
            t.is(result, resolve('index.scss'));
        });
    });

    test('should resolve file with extension with: ' + tested.name, t => {
        return tested.resolve('index.css', path.resolve('fixtures/module'), {
            extensions: ['.scss', '.css']
        }).then(result => {
            t.is(result, resolve('index.css'));
        });
    });

    test('should resolve local module (css) with: ' + tested.name, t => {
        return tested.resolve('module-1', path.resolve('fixtures/module'), {
            extensions: ['.css', '.scss']
        }).then(result => {
            t.is(result, resolve('module-1/main.css'));
        });
    });

    test.only('should resolve local module (index.scss) with: ' + tested.name, t => {   // eslint-disable-line max-len
        return tested.resolve('module-2', path.resolve('fixtures/module'), {
            extensions: ['.scss', '.css']
        }).then(result => {
            t.is(result, resolve('module-2/index.scss'));
        });
    });

    test('should resolve file via path with: ' + tested.name, t => {
        return tested.resolve('foo', path.resolve('fixtures/module'), {
            extensions: ['.scss', '.css'],
            path: [
                resolve('path-1'),
                resolve('path-2')
            ]
        }).then(result => {
            t.is(result, resolve('path-1/foo.css'));
        });
    });

    test('should resolve prefixed file with: ' + tested.name, t => {
        return tested.resolve('bar', path.resolve('fixtures/module'), {
            extensions: ['.scss', '.css'],
            prefix: '_'
        }).then(result => {
            t.is(result, resolve('_bar.css'));
        });
    });

    test('should resolve prefixed local module with: ' + tested.name, t => {
        return tested.resolve('module-3', path.resolve('fixtures/module'), {
            extensions: ['.scss', '.css'],
            prefix: '_'
        }).then(result => {
            t.is(result, resolve('_module-3/index.scss'));
        });
    });

    test('should resolve prefixed file via path with: ' + tested.name, t => {
        return tested.resolve('foo', path.resolve('fixtures/module'), {
            extensions: ['.scss', '.css'],
            prefix: '_',
            path: [
                resolve('path-1')
            ]
        }).then(result => {
            t.is(result, resolve('path-1/_foo.css'));
        });
    });
});
