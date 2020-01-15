<template>
  <div class="json-schema-form pure-form pure-form-stacked">
    <component
      :is="wrapperComponentParams.componentName"
      :key="propName"
      v-for="[propName, propSchema] in sortedSchemaProperties"
      v-bind="getWrapperProps(propName, propSchema)"
    >
      <component
        :is="propComponents[propName].componentName"
        v-bind="getProps(propName, propSchema)"
        @[propComponents[propName].eventName]="handleInput(propName, $event)"
      />
  </component>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Inject } from 'vue-property-decorator'
import { ISchema, ISchemaObject, IUiSchema, IAnyObject, ComponentsConfig, WrapperComponentConfig } from '../types'
import { getErrorText } from '../utils/getErrorText'
import { getComponent } from '../utils/getComponent'
import { inputWrapper } from '../utils/defaultComponents'
import TextInput from '../components/TextInput.vue'
import Checkbox from '../components/Checkbox.vue'
import Select from '../components/Select.vue'
import Radio from '../components/Radio.vue'
import InputWrapper from '../components/InputWrapper.vue'
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
  @Inject() readonly componentsConfig!: ComponentsConfig
  @Inject() readonly wrapperComponent!: WrapperComponentConfig

  get wrapperComponentParams () {
    return this.wrapperComponent || inputWrapper
  }

  get propComponents () : { [key: string]: { componentName: string, eventName: string, props: any}} {
    return Object.entries(this.schema.properties).reduce((result, [propName, propSchema]) => {
      return {
        ...result,
        [propName]: getComponent(propSchema, this.componentsConfig, this.getUiSchemaByPropName(propName))
      }
    }, {})
  }

  get sortedSchemaProperties () {
    return Object.entries(this.schema.properties).sort((a, b) => {
      const orderA : number = (this.uiSchema && this.uiSchema.properties && this.uiSchema.properties[a[0]] && this.uiSchema.properties[a[0]].order) || 0
      const orderB : number = (this.uiSchema && this.uiSchema.properties && this.uiSchema.properties[b[0]] && this.uiSchema.properties[b[0]].order) || 0
      return orderA > orderB ? -1 : 1
    })
  }

  get validationErrors () : { [key: string]: string } {
    const errors : { [key: string]: string } = {}

    if (!this.validations) return errors

    Object.keys(this.schema.properties).forEach(paramName => {
      const validation = this.validations[paramName]

      if (validation && validation.$invalid) errors[paramName] = getErrorText(validation)
    })

    return errors
  }

  getUiSchemaByPropName (propName: string) : IUiSchema | undefined {
    return (this.uiSchema && this.uiSchema.properties && this.uiSchema.properties[propName]) || undefined
  }

  getProps (propName: string, propSchema: ISchema) {
    const component = this.propComponents[propName]
    const customProps = component.props ? component.props(propName, propSchema, {}) : {}
    const uiSchema = this.getUiSchemaByPropName(propName)

    const isNested = propSchema.type === 'object' || propSchema.type === 'array'

    let props = {
      value: this.value[propName],
      ...customProps
    }

    if (isNested) {
      props = {
        ...props,
        schema: this.schema.properties[propName],
        validations: (this.validations && this.validations[propName]) || {},
        uiSchema
      }
    }

    return props
  }

  getWrapperProps (propName: string, propSchema: ISchema) {
    const propUiScehma = this.getUiSchemaByPropName(propName)
    const customProps = (this.wrapperComponentParams && this.wrapperComponentParams.props && this.wrapperComponentParams.props(propName, propSchema, propUiScehma)) || {}
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
