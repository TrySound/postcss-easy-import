import test from 'ava';
import path from 'path';
import resolveModule from '../lib/resolve-module.js';

const resolve = p => path.resolve('fixtures/module', p);

test(`should resolve 'index'`, t => {
    return resolveModule('index', path.resolve('fixtures/module'), {
        extensions: ['.css'],
        path: []
    }).then(result => {
        t.is(result, resolve('index.css'));
    });
});

test(`should resolve 'index.css'`, t => {
    return resolveModule('index.css', path.resolve('fixtures/module'), {
        extensions: ['.css'],
        path: []
    }).then(result => {
        t.is(result, resolve('index.css'));
    });
});

test(`should resolve main field`, t => {
    return resolveModule('module-1', path.resolve('fixtures/module'), {
        extensions: ['.css', '.scss'],
        path: []
    }).then(result => {
        t.is(result, resolve('module-1/main.scss'));
    });
});

test(`should resolve main field with wrong extension`, t => {
    return resolveModule('module-2', path.resolve('fixtures/module'), {
        extensions: ['.css', '.scss'],
        path: []
    }).then(result => {
        t.is(result, resolve('module-2/index.css'));
    });
});
