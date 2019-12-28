[![Build Status](https://travis-ci.com/roma219/vue-jsonschema-form.svg?branch=master)](https://travis-ci.com/roma219/vue-jsonschema-form) [![Coverage Status](https://coveralls.io/repos/github/roma219/vue-jsonschema-form/badge.svg?branch=master)](https://coveralls.io/github/roma219/vue-jsonschema-form?branch=master&service=github&kill_cache=1) [![dependencies Status](https://david-dm.org/roma219/vue-jsonschema-form/status.svg)](https://david-dm.org/roma219/vue-jsonschema-form) [![devDependencies Status](https://david-dm.org/roma219/vue-jsonschema-form/dev-status.svg)](https://david-dm.org/roma219/vue-jsonschema-form?type=dev) ![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/roma219/vue-jsonschema-form)

# vue-jsonschema-form
JSON Schema based form generator built with Vue.js. Currently Work in Progress.

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


