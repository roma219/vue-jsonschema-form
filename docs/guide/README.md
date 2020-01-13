
## Installation
```
npm install --save @roma219/vue-jsonschema-form
```


## Usage
``` vue
<JsonSchema :schema="schema" v-model="dataModel"/>
```

## JSON Schema
Schema should follow [JSON Schema Standard](https://json-schema.org/). Root shema should always be an object.
<!-- Supported JSON Schema features:
- refs
- conditions (if -> then, allof/oneof-if -> then, if -> then/allof-then). Only equality conditions (`const`) are supported -->

## Props
| Prop Name       | Value Type          | Description  |
| ------------- |:-------------:| -----:|
| schema      | object | JSON Schema |
| ui-schema      | object      |   UI Schema |
| value | object      | Data model object |

## Events
| Event Name        | Emitted Value Type | Description  |
| ------------- |:-------------:| -----:|
| input      | object | Emits on every data change. Full updated object from `:value` |
| init-default     | object      | Initial data model object generated with `default` values provided in schema. Usefull when you have an empty data model. |
| validated | boolean      | Is data model valid or not. Emits on each validation status change |