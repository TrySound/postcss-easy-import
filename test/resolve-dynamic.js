import test from 'ava';
import path from 'path';
import resolveDynamic from '../lib/resolve-dynamic.js';

const globResolve = p => path.resolve('fixtures/glob', p);
const moduleResolve = p => path.resolve('fixtures/module', p);

test('should resolve relative globs', t => {
    return resolveDynamic('relative.*', path.resolve('fixtures/glob'), {
        extensions: ['.css', '.scss'],
        path: []
    }).then(result => {
        t.same(result, [
            'relative.bar.scss',
            'relative.foo.css'
        ].map(globResolve));
    });
});

test('should resolve local module (css)', t => {
    return resolveDynamic('module-1', path.resolve('fixtures/module'), {
        extensions: ['.css', '.scss']
    }).then(result => {
        t.is(result, moduleResolve('module-1/main.css'));
    });
});
