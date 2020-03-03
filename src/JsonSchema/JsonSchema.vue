<template>
  <JsonSchemaForm
    :schema="conditionedScheema"
    :ui-schema="uiSchema"
    :value="value"
    :validations="validationErrors"
    :use-default-styles="useDefaultStyles"
    @input="handleChange"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue, Mixins, Provide } from 'vue-property-decorator'
import { processSchema } from '../utils/processSchema'
import { setValidators } from '../utils/setValidators'
import { unrefSchema } from '../utils/unrefSchema'
import { mergeComponents } from '../utils/getComponent'
import { generateDefaultValue } from '../utils/generateDefaultValue'
import { processSchemaConditions } from '../utils/processConditions'
import { JSONSchema7 } from 'json-schema'
import { ISchema, IUiSchema, IAnyObject, ComponentsConfig,
  WrapperComponentConfig, ErrorMessagesConfig, ISchemaBase, ISchemaObject } from '@/types'
import JsonSchemaForm from './JsonSchemaForm.vue'
import { validationMixin } from 'vuelidate'
import clone from 'nanoclone'

@Component({
  mixins: [validationMixin],
  name: 'JsonSchema',
  components: { JsonSchemaForm },
  validations () {
    return { value: setValidators((this as any).conditionedScheema) }
  }
})
export default class JsonSchema extends Vue {
  @Prop({ required: true }) readonly schema!: JSONSchema7
  @Prop() readonly uiSchema!: IUiSchema
  @Prop({ default: () => ({}) }) readonly value!: IAnyObject
  @Prop({ default: () => ([]) }) readonly components!: ComponentsConfig
  @Prop() readonly wrapper!: WrapperComponentConfig
  @Prop() readonly errors!: ErrorMessagesConfig
  @Prop({ default: true }) readonly useDefaultStyles!: boolean

  @Provide() componentsConfig = mergeComponents(this.components)
  @Provide() wrapperComponent = this.wrapper
  @Provide() customErrors = this.errors

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

  get processedSchema () : ISchema {
    return processSchema(this.schema)
  }

  get unreffedSchema () {
    return unrefSchema(this.schema as ISchemaObject)
  }

  get conditionedScheema () : ISchema {
    return processSchemaConditions(clone(this.unreffedSchema), this.value)
  }
}
</script>

<style lang="scss">
@import "node_modules/purecss/build/forms-min";

.pure-control-group {
  overflow: hidden;
}
</style>
