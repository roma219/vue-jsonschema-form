<template>
  <JsonSchemaForm
    :schema="schema"
    :value="value"
    @input="handleChange"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import JsonSchemaForm from './JsonSchemaForm.vue'

@Component({
  name: 'JsonSchema',
  components: {
    JsonSchemaForm
  }
})
export default class JsonSchema extends Vue {
  @Prop({ required: true }) protected schema!: any
  @Prop({ default: () => ({}) }) protected value!: any

  handleChange ({ path, value } : { path: Array<string>, value: any }) {
    // deep clone everything & emit changed version
    console.log(path, value)
  }
}
</script>

<style>
.json-schema-wrapper .form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  align-items: flex-start
}
</style>
