# Examples
## Basic Inputs
Full list of supported built-it components can be found [here](kek).
<Demo schema-name="basic"/>
## Nested Object
Nesting objects is supported. If you want to omit nested object's property name displayed - set it's `title` property to empty string.
<Demo schema-name="nested"/>
## Array of Objects
To specify schema for each array element, provide `items` parameter in array's schema.
<Demo schema-name="arrayOfObjects"/>
## Validations
<Demo schema-name="home"/>
## Conditions
<Demo schema-name="conditions"/>
## Default Values
Sometimes, usually when initializing a new data instance, you would want to use some default values. Full data model object with default values is emitted after initialization through a `@init-default` event.
``` vue
<JsonSchema :schema="schema" v-model="dataModel" @init-default="dataModel = $event"/>
```
<Demo schema-name="defaults" :use-defaults="true"/>
<!-- ## Display Order
## Providing titles for select -->