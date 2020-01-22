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
Schema should follow [JSON Schema Standard](https://json-schema.org/). Root shema should always be of type `object`.

Supported JSON Schema features: TBA

## Props
| Prop Name       | Value Type          | Description  |
| ------------- |:-------------:| -----:|
| schema      | object | JSON Schema |
| ui-schema      | object      |   UI Schema |
| value | object      | Data model object |
| components | array | [Custom Components](/guide/#custom-components) |
| wrapper | object | [Custom Wrapper Component](/guide/#custom-wrapper-component) |
| errors | array | [Custom Error Messages](/guide/#custom-error-messages) |

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

## Custom Components
You can use custom input components with Vue JSON Schema Form. Component is selected for rendering a piece of schema by checking the `matcher` parameter.
### Requirements
- These components should be globally registered in Vue
- They should have a `prop` to "receive" value
- They should emit an event on every value change

### `components` prop
Should be an array of components configs.

### Component Config Structure
| Parameter       | Value Type          | Required | Default |Description  |
| ------------- |:-------------:| :-------------:| :-------------:| -----:|
| matcher      |object | no | - | Object that should be contained in property's Schema to be rendered |
| uiSchemaMatcher      |object | no | - | Object that should be contained in property's UI Schema to be rendered. Used if `matcher` is not provided. |
| contains      |string | no | - | Name of the parameter that should be presend in a schema to select the component. Used if `matcher` and `uiSchemaMatcher` are not provided.|
| componentName      | string      | yes | `TextInput` | Name of the Vue component |
| eventName      | string   | no | `input`  | Name of event that is gonna be emitted on each value change |
| props | function      | no | - | Function that should return an object, that will be bound as props to component. <br/>`(propName, schema, uiSchema) => ({ ... })`|

See example [here](/examples/#custom-components).
## Custom Wrapper Component
Each rendered component is rendered in a wrapper component. By default it displays title and possible validation errors validation. You can provide your own. It must include a slot where actual input component is gonna be rendered. `props` function should return an object which will be passed downs as props to each wrapper component. This is default config:
``` js
{
    componentName: 'InputWrapper',
    props: (propName, schema, uiSchema) => ({
        title: schema.title || schema.title === '' ? schema.title : propName,
        disabled: uiSchema && uiSchema.disabled,
        vertical: schema.type === 'object' || schema.type === 'array'
    })
}
```
See example [here](/examples/#custom-wrapper-component).
## Custom Error Messages
You can provide your own messages for supported validations (`minLength`, `maxLength`, `minValue`, `maxValue`, `required`) and `default` error message. Default messages:
``` js
{
    minLength: value => `Minimal length: ${value}`,
    maxLength: value => `Maximum length: ${value}`,
    minValue: value => `Minimal value: ${value}`,
    maxValue: value => `Maximum value: ${value}`,
    required: 'Field is required',
    default: 'Invalid Value'
}
```
See example [here](/examples/#custom-error-messages).
