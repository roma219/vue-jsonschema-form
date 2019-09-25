<template>
  <JsonSchemaForm
    :schema="processedSchema"
    :ui-schema="uiSchema"
    :value="value"
    :validations="validationErrors"
    @input="handleChange"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue, Mixins } from 'vue-property-decorator'
import { processSchema } from '@/utils/processSchema'
import { setValidators } from '@/utils/setValidators'
import { JSONSchema7 } from 'json-schema'
import { ISchema, IUiSchema, IAnyObject, IConfig } from '@/types'
import cloneDeep from 'lodash/cloneDeep'
import JsonSchemaForm from './JsonSchemaForm.vue'
import { validationMixin } from 'vuelidate'

@Component({
  mixins: [validationMixin],
  name: 'JsonSchema',
  components: { JsonSchemaForm },
  validations () {
    return { value: setValidators((this as any).processedSchema) }
  }
})
export default class JsonSchema extends Vue {
  @Prop({ required: true }) protected schema!: JSONSchema7
  @Prop() protected uiSchema!: IUiSchema
  @Prop({ default: () => ({}) }) protected value!: IAnyObject
  @Prop({ default: () => ({}) }) protected config!: IConfig

  get validationErrors () {
    return (this as any).$v.value
  }

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
    return processSchema(this.schema, this.uiSchema, this.config)
  }
}
</script>
