<template>
  <div class="json-schema-form">
    <component
      :is="wrapperComponent.componentName"
      v-for="[propName, propSchema] in sortedSchemaProperties"
      :key="propName"
      v-bind="getWrapperProps(propName, propSchema)"
    >
      <component
        :is="propSchema.componentName"
        v-bind="getProps(propName, propSchema)"
        @[getEventName(propSchema)]="handleInput(propName, $event)"
      />
  </component>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ISchema, ISchemaObject, IUiSchema, IAnyObject, IConfig, ComponentsConfig } from '@/types'
import { getErrorText } from '@/utils/getErrorText'
import config from '@/utils/config'
import TextInput from '@/components/TextInput.vue'
import Checkbox from '@/components/Checkbox.vue'
import Select from '@/components/Select.vue'
import Radio from '@/components/Radio.vue'
import InputWrapper from '@/components/InputWrapper.vue'
import JsonSchemaArray from './JsonSchemaArray.vue'

@Component({
  name: 'JsonSchemaForm',
  components: {
    TextInput, Checkbox, Select, InputWrapper, JsonSchemaArray, Radio
  }
})
export default class JsonSchemaForm extends Vue {
  @Prop({ required: true }) readonly schema!: ISchemaObject
  @Prop() readonly uiSchema!: IUiSchema
  @Prop({ default: () => ({}) }) readonly value!: IAnyObject
  @Prop() readonly validations!: any

  get wrapperComponent () {
    // todo : support custom input wrapper
    return config.inputWrapper
  }

  get sortedSchemaProperties () {
    if (!this.schema.properties) return

    const uiSchema = (this.uiSchema && this.uiSchema.properties) || {}

    return Object.entries(this.schema.properties).sort((a, b) => {
      const aPosition = uiSchema[a[0]]?.order || 999
      const bPosition = uiSchema[b[0]]?.order || 999

      if (aPosition < bPosition) return -1

      if (aPosition > bPosition) return 1

      return 0
    })
  }

  get validationErrors () : { [key: string]: string } {
    const errors : { [key: string]: string } = {}

    if (!this.validations) return errors

    Object.keys(this.schema.properties).forEach(paramName => {
      const validation = this.validations[paramName]

      if (validation?.$invalid) errors[paramName] = getErrorText(validation)
    })

    return errors
  }

  getEventName (propSchema : ISchema) {
    return propSchema.eventName
  }

  getProps (propName: string, propSchema: ISchema) {
    const customProps = propSchema.props ? propSchema.props(propSchema, {}) : {}
    const uiSchema = this.uiSchema?.properties?.[propName] || undefined

    return {
      value: this.value[propName],
      schema: this.schema.properties[propName],
      validations: this.validations?.[propName] || {},
      uiSchema,
      ...customProps
    }
  }

  getWrapperProps (propName: string, propSchema: ISchema) {
    const propUiScehma = this.uiSchema?.properties?.[propName] || undefined

    const customProps = this.wrapperComponent?.props?.(propName, propSchema, propUiScehma) || {}

    const isPropNested = propSchema.type === 'object' || propSchema.type === 'array'

    return {
      error: isPropNested ? '' : this.validationErrors[propName],
      ...customProps
    }
  }

  handleInput (propName: string, newValue: any) {
    const isPropNested = this.schema.properties[propName].type === 'object' ||
      this.schema.properties[propName].type === 'array'
    const path = isPropNested ? [propName, ...newValue.path] : [propName]
    const value = isPropNested ? newValue.value : newValue
    this.$emit('input', { path, value })
  }
}
</script>

<style>
.json-schema-form {
  width: 100%;
}
</style>
