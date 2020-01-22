[![Build Status](https://travis-ci.com/roma219/vue-jsonschema-form.svg?branch=master)](https://travis-ci.com/roma219/vue-jsonschema-form) [![Coverage Status](https://coveralls.io/repos/github/roma219/vue-jsonschema-form/badge.svg?branch=master&service=github&kill_cache=1)](https://coveralls.io/github/roma219/vue-jsonschema-form?branch=master&service=github&kill_cache=1) [![dependencies Status](https://david-dm.org/roma219/vue-jsonschema-form/status.svg)](https://david-dm.org/roma219/vue-jsonschema-form) [Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/roma219/vue-jsonschema-form) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/roma219/vue-jsonschema-form.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/roma219/vue-jsonschema-form/context:javascript) ![last commit](https://badgen.net/github/last-commit/roma219/vue-jsonschema-form)
&nbsp;

![minified size](https://badgen.net/bundlephobia/min/@roma219/vue-jsonschema-form)
![](https://badgen.net/bundlephobia/minzip/@roma219/vue-jsonschema-form)

# vue-jsonschema-form
JSON Schema based form generator built with Vue.js. Currently Work in Progress.

### Full Guide and Examples
https://roma219.github.io/vue-jsonschema-form/guide/

### Installation
```
npm install @roma219/vue-jsonschema-form
```

### Usage
```
<JsonSchema :schema="schema" v-model="value"/>

schema = {
    type: 'object',
    properties: {
      aaa: { type: 'string', minLength: 1 },
      bbb: { type: 'boolean' },
      ccc: { type: 'string', enum: ['1', '2', '3'] },
      ddd: {
        type: 'object',
        title: '',
        properties: {
          a1: { type: 'string', minLength: 1, maxLength: 5 },
          b2: { type: 'boolean', default: true },
          ddd: {
            type: 'object',
            properties: {
              a1: { type: 'string', default: 'aaa' },
              b2: { type: 'boolean' }
            }
          }
        }
      }
    }
}
```


