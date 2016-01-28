# postcss-easy-import [![Build Status][ci-img]][ci]

[PostCSS] plugin to inline @import rules content with extra features.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/TrySound/postcss-easy-import.svg
[ci]:      https://travis-ci.org/TrySound/postcss-easy-import

```css
.foo {
    /* Input example */
}
```

```css
.foo {
  /* Output example */
}
```

## Usage

```js
postcss([ require('postcss-easy-import') ])
```

See [PostCSS] docs for examples for your environment.
