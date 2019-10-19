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
import { Component, Prop, Vue, Mixins, Provide } from 'vue-property-decorator'
import { processSchema } from '@/utils/processSchema'
import { setValidators } from '@/utils/setValidators'
import { JSONSchema7 } from 'json-schema'
import { ISchema, IUiSchema, IAnyObject, ComponentsConfig,
  WrapperComponentConfig, ErrorMessagesConfig } from '@/types'
import JsonSchemaForm from './JsonSchemaForm.vue'
import { validationMixin } from 'vuelidate'
import { generateDefaultValue } from '@/utils/generateDefaultValue'
import clone from 'nanoclone'
// require('purecss/build/pure-min.css')

@Component({
  mixins: [validationMixin],
  name: 'JsonSchema',
  components: { JsonSchemaForm },
  validations () {
    return { value: setValidators((this as any).processedSchema) }
  }
})
export default class JsonSchema extends Vue {
  @Prop({ required: true }) readonly schema!: JSONSchema7
  @Prop() readonly uiSchema!: IUiSchema
  @Prop({ default: () => ({}) }) readonly value!: IAnyObject
  @Prop() readonly components!: ComponentsConfig
  @Prop() readonly wrapperComponentConfig!: WrapperComponentConfig
  @Prop() readonly errorMessagesConfig!: ErrorMessagesConfig

  @Provide() componentsConfig = this.components
  @Provide() wrapperComponent = this.wrapperComponentConfig

  get validationErrors () {
    return (this as any).$v.value
  }

  created () {
    this.$emit('init-default', generateDefaultValue(this.processedSchema))
  }

  handleChange ({ path, value } : { path: Array<string>, value: any }) {
    const newValue = { ...this.value }
    const paramName = path.pop() || ''

    let target = newValue
    path.forEach(paramName => {
      if (!target[paramName]) target[paramName] = {}
      target = target[paramName]
    })

    target[paramName] = value

    this.$emit('input', newValue)
  }

  get unreffedSchema () : any {
    return {}
  }

  get processedSchema () : ISchema {
    // todo: unref schema => check conditions => finalized schema
    return processSchema(this.schema)
  }
}
</script>
