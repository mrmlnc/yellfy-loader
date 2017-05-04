# yellfy-loader

[![Greenkeeper badge](https://badges.greenkeeper.io/mrmlnc/yellfy-loader.svg)](https://greenkeeper.io/)

> User-friendly Gulp task manager for Yellfy project.

[![Travis Status](https://travis-ci.org/mrmlnc/yellfy-loader.svg?branch=master)](https://travis-ci.org/mrmlnc/yellfy-loader)

## Install

```shell
$ npm i -D yellfy-loader
```

## Usage

**gulpfile.js**

```js
const loader = require('yellfy-loader');

loader.setup('./gulp/tasks', {
	// options
});
```

**gulp/tasks/task.js**

```js
'use strict';

function task(done) {
  done();
}

module.exports = {
  task,
  description: 'test'
}
```

## Supported options

**gulp**

  * Type: `Object`
  * Default: `module.parent.require('gulp')`

The gulp instance to use.

**reporter**

  * Type: `Function`
  * Default: `The following tasks have errors: %s`
  * Example: `reporter: (valid, invalid) => ...`

Custom reporter.

**rename**

  * Type: `Object`
  * Default: `undefined`
  * Example: `{ 'task-name': 'pikachu' }`

Renaming tasks.

## Changelog

See the [Releases section of our GitHub project](https://github.com/mrmlnc/yellfy-loader/releases) for changelogs for each release version.

## License

This software is released under the terms of the MIT license.
