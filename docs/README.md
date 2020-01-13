---
home: true
heroImage:
actionText: Get Started →
actionLink: /guide/
features:
- title: Zero Configuration
  details: Has built-in components that allow you to quickstart your form with only JSON Schema provided
- title: Validation
  details: Powered by Vuelidate, has built-it validation mechanism & validation errors display
- title: Customizable
  details: You can use your own UI components and validation rules if needed
footer: Vue JSON Schema Form 2020
---

### Example

``` vue
<JsonSchema :schema="schema" v-model="dataModel"/>
```

<ClientOnly>
<Demo schema-name="home"/>
</ClientOnly>

---
<p style="text-align: center;"><b>This is currently work in progress. More details coming soon...</b></p>