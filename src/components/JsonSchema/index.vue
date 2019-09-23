<template>
  <JsonSchemaForm
    :schema="processedSchema"
    :ui-schema="uiSchema"
    :value="value"
    @input="handleChange"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { processSchema } from '@/utils/processSchema'
import { JSONSchema7 } from 'json-schema'
import { ISchema, IUiSchema, IAnyObject } from '@/types'
import cloneDeep from 'lodash/cloneDeep'
import JsonSchemaForm from './JsonSchemaForm.vue'

@Component({
  name: 'JsonSchema',
  components: { JsonSchemaForm }
})
export default class JsonSchema extends Vue {
  @Prop({ required: true }) protected schema!: JSONSchema7
  @Prop() protected uiSchema!: IUiSchema
  @Prop({ default: () => ({}) }) protected value!: IAnyObject

  handleChange ({ path, value } : { path: Array<string>, value: any }) {
    const newValue = cloneDeep(this.value)
    const paramName = path.pop() || ''

    let target = newValue
    path.forEach(paramName => {
      if (!target[paramName]) target[paramName] = {}

      target = target[paramName]
    })

    target[paramName] = value

    this.$emit('input', newValue)
  }

  get processedSchema () : ISchema {
    return processSchema(this.schema, this.uiSchema)
  }
}
</script>
