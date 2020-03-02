---
home: true
heroImage: /logo.png
actionText: Get Started →
actionLink: /guide/
features:
- title: Zero Configuration
  details: Just provide a JSON Schema, and the form will be generated via built-in components
- title: Validation Support
  details: Powered by Vuelidate, has built-it validation mechanism and validation errors display
- title: Customizable
  details: You can use your own UI components
footer: Vue JSON Schema Form 2020
---

### Example

``` vue
<JsonSchema :schema="schema" v-model="dataModel"/>
```

<Demo schema-name="home"/>

Feel free to play with it on [Codesandbox](https://codesandbox.io/s/vue-jsonschema-form-basic-example-zid04?fontsize=14&hidenavigation=1&module=%2Fsrc%2FApp.vue&theme=dark)

---