<template>
  <div class="json-schema-wrapper">
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
import { ISchema, IUiSchema, IAnyObject, IConfig } from '@/types'
import { getErrorText } from '@/utils/getErrorText'
import config from '@/utils/config'
import TextInput from '@/components/TextInput.vue'
import Checkbox from '@/components/Checkbox.vue'
import Select from '@/components/Select.vue'
import InputWrapper from '@/components/InputWrapper.vue'

@Component({
  name: 'JsonSchemaForm',
  components: {
    TextInput, Checkbox, Select, InputWrapper
  }
})
export default class JsonSchemaForm extends Vue {
  @Prop({ required: true }) readonly schema!: ISchema
  @Prop() readonly uiSchema!: IUiSchema
  @Prop({ default: () => ({}) }) readonly value!: IAnyObject
  @Prop() readonly validations!: any
  @Prop() readonly config!: IConfig

  get wrapperComponent () {
    return (this.config && this.config.inputWrapper) || config.inputWrapper
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

    Object.keys(this.schema.properties || {}).forEach(paramName => {
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
      schema: this.schema.properties?.[propName],
      config: this.config,
      validations: this.validations?.[propName] || {},
      uiSchema,
      ...customProps
    }
  }

  getWrapperProps (propName: string, propSchema: ISchema) {
    const propUiScehma = this.uiSchema?.properties?.[propName] || undefined

    const customProps = this.wrapperComponent?.props?.(propName, propSchema, propUiScehma) || {}

    return {
      error: propSchema.type !== 'object' ? this.validationErrors[propName] : '',
      ...customProps
    }
  }

  handleInput (propName: string, newValue: any) {
    if (!this.schema.properties) return
    const path = this.schema.properties[propName].type === 'object' ? [propName, ...newValue.path] : [propName]
    const value = this.schema.properties[propName].type === 'object' ? newValue.value : newValue
    this.$emit('input', { path, value })
  }
}
</script>
