## Introduction
Vue JSON Schema Form library uses object presented in a [JSON Schema Standard](https://json-schema.org/) to generate an input form and update provided data model.

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

Supported JSON Schema features: TBA

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

## Built-in Components
This is the list of built-in components and corresponding JSON Schema blocks.

### String Input
```js
{
    type: 'string'
}
```
<div class="json-schema-form pure-form pure-form-aligned">
    <TextInput value="yes"/>
</div>

### Number Input
```js
{
    type: 'number'
}
```
<div class="json-schema-form pure-form pure-form-aligned">
    <TextInput type="number"/>
</div>

### Boolean Input
```js
{
    type: 'boolean'
}
```
<div class="json-schema-form pure-form pure-form-aligned">
    <Checkbox/>
</div>


### Select
```js
{
    enum: ['option 1', 'option 2', 'option 3']
}
```
<div class="json-schema-form pure-form pure-form-aligned">
    <Select :options="['option 1', 'option 2', 'option 3']"/>
</div>


### Object
```js
{
    type: 'object',
    properties: {
        a: { type: 'string' },
        b: { type: 'number' }
    }
}
```
<div class="json-schema-form pure-form pure-form-aligned">
    <JsonSchema :schema="{ type: 'object', properties: { a: { type: 'string' }, b: { type: 'number' } } }"/>
</div>

### Array Of Objects
```js
{
    type: 'array',
    items: {
        type: 'object',
        properties: {
            a: { type: 'string' },
            b: { type: 'number' }
        }
    }
}
```
<div class="json-schema-form pure-form pure-form-aligned">
    <JsonSchema :schema="{ type: 'object' , properties: { arr: { type: 'array', title: '', items: { type: 'object', properties: { a: { type: 'string' }, b: { type: 'number' } } } } } }"/>
</div>


## UI Schema
UI Schema is an optional schema which can provide additional UI features that cannot be implemented via regular JSON Schema, such as using specific UI Component.
```js
// schema
{
    type: 'object',
    properties: {
        a: {
            type: 'string',
            enum: ['option 1', 'option 2', 'option 3']
        }
    }
}

// ui schema
{
    properties: {
        a: {
            uiType: 'radio'
        }
    }
}
```

<div class="json-schema-form pure-form pure-form-aligned">
    <Radio :options="['option 1', 'option 2', 'option 3']"/>
</div>
