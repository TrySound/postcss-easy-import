import test from 'ava';
import easyImport from '../';
import path from 'path';
import postcss from 'postcss';

const msg = err => 'postcss-easy-import: ' + err;

// for tests to work with ava >=0.18
process.chdir(__dirname);

function preprocess(input, output, opts, t) {
    return postcss([ easyImport(opts) ]).process(input)
        .then(result => {
            t.is(result.css, output);
            t.is(result.warnings().length, 0);
        });
}

test('should fail on incorrect \'prefix\'', t => {
    t.throws(() => {
        easyImport({
            prefix: 1
        });
    }, msg('\'prefix\' option should be a string or false'));
});

test('should not fail on correct \'prefix\'', t => {
    t.notThrows(() => {
        easyImport({
            prefix: 'some string'
        });
    });

    t.notThrows(() => {
        easyImport({
            prefix: false
        });
    });
});

test('should fail on incorrect \'extensions\'', t => {
    const error = msg(
        '\'extensions\' option should be string or array of strings'
    );

    t.throws(() => {
        easyImport({
            extensions: 1
        });
    }, error);

    t.throws(() => {
        easyImport({
            extensions: ''
        });
    }, error);

    t.throws(() => {
        easyImport({
            extensions: []
        });
    }, error);

    t.throws(() => {
        easyImport({
            extensions: ['']
        });
    }, error);
});

test('should not fail on correct \'extensions\'', t => {
    t.notThrows(() => {
        easyImport({
            extensions: '.css'
        });
    });

    t.notThrows(() => {
        easyImport({
            extensions: ['.css', '.scss']
        });
    });
});

test('should handle glob imports', t => {
    return preprocess(
        '@import "./*.css";\n',
        '.bar {\n    color: green;\n}\n.foo {\n    color: red;\n}\n',
        { root: path.resolve('./fixtures/integration') },
        t
    );
});

test('should handle module imports', t => {
    return preprocess(
        '@import "./module/baz.css";\n',
        '.baz {\n    color: blue;\n}\n',
        { root: path.resolve('./fixtures/integration') },
        t
    );
});

test('should handle glob and module imports together', t => {
    return preprocess(
        '@import "./module/baz.css";\n @import "./*.css";',
        '.baz {\n    color: blue;\n}\n .bar {\n    color: green;\n}\n .foo {\n    color: red;\n}', // eslint-disable-line max-len
        { root: path.resolve('./fixtures/integration') },
        t
    );
});

test('should import glob from node_modules', t => {
    return preprocess(
        '@import "css.globtest/*.css"',
        '.bar {\n  color: green;\n}\n.foo {\n  color: tomato;\n}',
        {},
        t
    );
});
