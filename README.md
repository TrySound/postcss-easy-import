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

See [PostCSS] docs for examples for your environment.

## Options

This plugin is a [postcss-import] extension which introduces its own `resolve` option.

### prefix

Type: `false` or `string`
Default: `false`

Allows partial-like importing with a prefix before the filename.

```css
@import 'modules/partial.css';
/* will import modules/_partial.css */
```

### extensions

Type: `array` or `string`
Default: `.css`

Defines file extensions which will be looked for.

### glob

Type: `boolean`
Default: `false`

Disables module lookup and imports modules based on a glob pattern.

# License

MIT © [Bogdan Chadkin](mailto:trysound@yandex.ru)
