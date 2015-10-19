# metalsmith-xo


An [XO](https://github.com/sindresorhus/xo) plugin for Metalsmith that uses [metalsmith-elint](https://github.com/ubenzer/metalsmith-eslint) and [eslint-config-xo](https://github.com/sindresorhus/eslint-config-xo) underneath for a minimal config linter.

## Installation

```sh
npm install --save metalsmith-xo
```

## Getting Started

If you haven't checked out [Metalsmith](http://metalsmith.io/) before, head over to their website and check out the
documentation.

## Usage

```js
var xo = require('metalsmith-xo');

metalsmith
  .use(xo());
```

## Configuration

**Enable ES2015+ features**
```js
metalsmith.use(xo('esnext'));
```

**Enable browser features**
```js
metalsmith.use(xo('browser'));
```

You can pass `esnext` or `browser` to the function to turn on the rules you need. However, `esnext` requires some extra modules that you can read [over there](https://github.com/sindresorhus/eslint-config-xo).
