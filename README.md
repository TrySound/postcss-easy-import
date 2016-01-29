# postcss-easy-import [![Build Status][ci-img]][ci]

[PostCSS] plugin to inline @import rules content with extra features.

[postcss-import]: https://github.com/postcss/postcss-import
[PostCSS]: https://github.com/postcss/postcss
[ci-img]: https://travis-ci.org/TrySound/postcss-easy-import.svg
[ci]: https://travis-ci.org/TrySound/postcss-easy-import

## Usage

```js
postcss([ require('postcss-easy-import') ])
```

## Options

This plugin is [postcss-import] extension which introduce own `resolve` option.

### prefix

Type: `false` or `string`
Default: `false`

Let to use partial-like importing with prefix before filename.

```css
@import 'modules/partial.css';
/* will be imported modules/_partial.css */
```

### extensions

Type: `array` or `string`
Default: `.css`

Defines file extensions which will be looked for.

### glob

Type: `boolean`
Default: `false`

Enable resolver which do not support modules and let to use glob magic in `@import`.

See [PostCSS] docs for examples for your environment.

# License

MIT © [Bogdan Chadkin](mailto:trysound@yandex.ru)
