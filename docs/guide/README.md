## Introduction
Vue JSON Schema Form library uses JSON presented in a [JSON Schema Standard](https://json-schema.org/) to generate an input form and update provided data model.

## Installation
```
npm install --save @roma219/vue-jsonschema-form
```

## Usage
``` vue
<JsonSchema :schema="schema" v-model="dataModel"/>
```

## JSON Schema
Schema should follow [JSON Schema Standard](https://json-schema.org/). Root shema type should be `object`.

## Props
| Prop Name       | Value Type          | Description  |
| ------------- |:-------------:| -----:|
| schema      | object | JSON Schema |
| ui-schema      | object      |   [UI Schema](/guide/#custom-components) |
| value | object      | Data model object |
| components | array | [Custom Components](/guide/#custom-components) |
| wrapper | object | [Custom Wrapper Component](/guide/#custom-wrapper-component) |

## Events
| Event Name        | Emitted Value Type | Description  |
| ------------- |:-------------:| -----:|
| input      | object | Emitted on every data change. The argument is updated data model object (`:value` prop). |
| init-default     | object      | Initial data model object generated with `default` values provided in schema. Usefull when you have an empty data model at the start. See [example](/examples/#default-values).  |
| validated | boolean      | Emitted on every validation status change. `true` - data model is valid, `false`  - data model is not valid. Usefull when you need to have some indicator of form validity, for example to disable `Save` button.|

## Built-in Components
This is the list of built-in components and corresponding JSON Schema blocks. If you want to use different (your own or some UI kit) components, see [Custom Components](/guide/#custom-components).

### String Input
```js
{
    type: 'string'
}
```
<div class="json-schema-form pure-form">
    <TextInput value="yes"/>
</div>

### Number Input
```js
{
    type: 'number'
}
```
<div class="json-schema-form pure-form">
    <TextInput type="number"/>
</div>

### Boolean Input
```js
{
    type: 'boolean'
}
```
<div class="json-schema-form pure-form">
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
<div class="json-schema-form pure-form">
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
<Demo schema-name="arrayOfObjects" :show-source="false"/>


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
- Each component should be globally registered in `Vue`
- Each component should have a prop `value` to receive corresponding value
- Each component should emit an event on every value change

### Usage
``` vue
<JsonSchema :schema="schema" v-model="dataModel" :components="componentsConfig"/>
```
Custom Components config is provided via `components` prop to `JsonSchema` component. `components` should be an array containing each component's config.

### Component Config Structure
Component is mapped to JSON Schema piece by using either of the following parameters: `matcher`, `uiSchemaMatcher`, `contains`.

| Parameter       | Value Type          | Required | Default |Description  |
| ------------- |:-------------:| :-------------:| :-------------:| -----:|
| matcher      |object | no | - | Object that should be contained in parameter's schema piece |
| uiSchemaMatcher      |object | no | - | Object that should be contained in property's UI Schema piece. Used if `matcher` is not provided. See matchers for [built-in components](/guide/#built-in-components).|
| contains      |string | no | - | Name of the parameter that should be present in a parameter's schema piece. Used if `matcher` and `uiSchemaMatcher` are not provided.|
| componentName      | string      | yes | `TextInput` | Name of the Vue component |
| eventName      | string   | no | `input`  | Name of the event that is gonna be emitted on each value change |
| props | function      | no | - | Function that should return an object, that will be bound as props to component. Usefull when you want to provide additional data to component from schema. <br/>`(propName, schema, uiSchema) => ({ ... })`|

See example [here](/examples/#custom-components).

## Custom Wrapper Component
``` vue
<JsonSchema :schema="schema" v-model="dataModel" :wrapper="wrapperComponentConfig"/>
```

Each schema component is rendered inside a wrapper component. By default it displays property title and possible validation errors. You can provide your own wrapper. The only requirment is that it should contain a `<slot>` where actual input component will be displayed. `props` function is optional and should return an object which will be passed downs as props to each wrapper component.
This is default wrapper component config:
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