[![Build Status](https://travis-ci.org/talha-asad/mongoose-url-slugs.svg?branch=master)](https://travis-ci.org/talha-asad/mongoose-url-slugs)
[![NPM version](https://badge.fury.io/js/mongoose-url-slugs.svg)](http://badge.fury.io/js/mongoose-url-slugs)

[![NPM stats](https://nodei.co/npm/mongoose-url-slugs.png?downloads=true)](https://www.npmjs.org/package/mongoose-url-slugs)

# Mongoose URL Slugs

A simple URL based slug generator for mongoose models.


## Installation

```
$ npm install mongoose-url-slugs
```
## V1 Breaking Changes

Option keys are now all Camel case, as opposed to previously.

## What is a Slug?

A slug is a human-readable unique identifier that can be used in a URL instead of an ID or hash. This is common in content sites where the title of the article is "slugified" to turn this ugly URL

> http://example.com/a12Qv09b4

into this pretty one

> http://example.com/your-article-title-here

## How Slugs are Formatted

When supplied with a string, the following steps are taken to transform it into a slug.

- Accented characters are converted to regular equivalent characters.
- Converted to lower case
- All punctuation is removed
- All spaces are replaced with dashes
- Add a number to the end if the slug isn't unique (eg: `my-cool-slug` and `my-cool-slug-2`)

## Example Usage


### Example 1: Using default options and using 2 fields for slug generation.

```js
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    URLSlugs = require('mongoose-url-slugs');

var testSchema = new Schema({
  first_name: {type: String, default: '', trim: true},
  last_name: {type: String, default: '', trim: true},
  rev: {type: String, default: '', trim: true}
});

testSchema.plugin(URLSlugs('first_name last_name'));
```

### Example 2: Using 'myslug' key for storing slug.

```js
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    URLSlugs = require('mongoose-url-slugs');

var testSchema = new Schema({
  first_name: {type: String, default: '', trim: true},
  last_name: {type: String, default: '', trim: true},
  rev: {type: String, default: '', trim: true}
});

// Save slugs to 'myslug' field.
testSchema.plugin(URLSlugs('first_name last_name', {field: 'myslug'}));
```


## Options and defaults

* **field** (Default: 'slug') - Slug field to use for storage.
* **addField** (Default: True) - Add slug field to mongoose schema.
* **separator** (Default: '-') - Separator to use for invalid characters.
* **generator(text, separator)** (Default: lowercases and replaces all non alphanumeric to seperator) - Function to generate slug.
* **undefinedVal** (Default: 'undefined') - Uses this string when slug dependent fields don't exist.
* **maxLength** (Default: null) - If set, restricts slug length to specified value.
* **update** (Default: False) - Update slug when dependent fields change.
* **alwaysRecreate** (Default: False) - If true, will recreate slug regardless of change on dependent fields.
* **index** (Default: True) - Mark slug field as an index in mongoose schema.
* **indexType** (Default: String) - Mongoose schema slug index type.
* **indexDefault** (Default: '') - Mongoose schema slug index default value.
* **indexTrim** (Default: True) - Mongoose schema slug index trim value.
* **indexUnique** (Default: True) - Mongoose schema slug index unique value.
* **indexRequired** (Default: True) - Mongoose schema slug index required value.
* **indexSparse** (Default: False) - Mongoose schema slug index sparse value.
* **onHook** (Default: 'validate') - Mongoose document hook to create/update slug.

## License

The MIT License (MIT)

Copyright (c) 2014 - 2017 Talha Asad

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.