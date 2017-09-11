### HEAD

### 3.0.0

* Update `postcss-import` to `10.0.0`
* Update `pify` to `3.0.0`
* Update `is-glob` to `4.0.0`
* Update `postcss` to `6.0.11`

### 2.1.0

* Add ability to glob inside `node_modules` and `web_modules` - [#16](https://github.com/TrySound/postcss-easy-import/pull/16)

### 2.0.0

* Remove `glob` option and infer type of from the import path. Allows a mixture
  of glob and module imports to be used - ([#14](https://github.com/TrySound/postcss-easy-import/pull/14))
* When `prefix` is set resolve non-prefixed version of a file if that is the only match, otherwise
  always favour the prefixed version - ([commit](https://github.com/TrySound/postcss-easy-import/commit/2e520d2bc9cb4f3f85d1453ca4185d1d8604baca))
* Update `ava` `0.11.0` -> `0.16.0`
* Update `eslint` `2.0.0` -> `3.11.1`
* Update `globby` `4.0.0` -> `6.1.0`
* Update `postcss-import` `8.0.2` -> `9.1.0`
* Drop Node `0.12` support. Reached EOL on 31/12/2016 - ([link](https://github.com/nodejs/LTS))

### 1.0.1

* Fix `package.json` files filter

### 1.0.0

* Initial release
