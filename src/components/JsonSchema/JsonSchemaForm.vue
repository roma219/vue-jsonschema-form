<template>
  <div class="json-schema-wrapper">
    <component
      :is="wrapperComponent.name"
      v-for="[propName, propSchema] in sortedSchemaProperties"
      :key="propName"
      v-bind="getWrapperProps(propName, propSchema)"
    >
      <component
        :is="propSchema.__component__"
        v-bind="getProps(propName, propSchema)"
        @[getEventName(propSchema)]="handleInput(propName, $event)"
      />
  </component>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ISchema, IUiSchema, IAnyObject } from '@/types'
import { getErrorText } from '@/utils/getErrorText'
import config from '@/utils/config'

@Component({
  name: 'JsonSchemaForm',
  components: {
    // default components
    TextInput: () => import('@/components/TextInput.vue'),
    Checkbox: () => import('@/components/Checkbox.vue'),
    Select: () => import('@/components/Select.vue'),
    InputWrapper: () => import('@/components/InputWrapper.vue')
  }
})
export default class JsonSchemaForm extends Vue {
  @Prop({ required: true }) protected schema!: ISchema
  @Prop() protected uiSchema!: IUiSchema
  @Prop({ default: () => ({}) }) protected value!: IAnyObject
  @Prop() protected validations!: any

  get wrapperComponent () {
    return config.inputWrapper
  }

  get sortedSchemaProperties () {
    if (!this.schema.properties) return

    const uiSchema = (this.uiSchema && this.uiSchema.properties) || {}

    return Object.entries(this.schema.properties).sort((a, b) => {
      const aPosition = (uiSchema[a[0]] && uiSchema[a[0]].order) || 999
      const bPosition = (uiSchema[b[0]] && uiSchema[b[0]].order) || 999

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

      if (validation && validation.$invalid) errors[paramName] = getErrorText(validation)
    })

    return errors
  }

  getEventName (propValue : ISchema) {
    return propValue.__eventName__
  }

  getProps (propName: string, propValue: ISchema) {
    const customProps = propValue.__props__ ? propValue.__props__(propValue, {}) : {}
    const uiSchema = (this.uiSchema && this.uiSchema.properties && this.uiSchema.properties[propName]) || undefined

    return {
      value: this.value[propName],
      schema: this.schema.properties && this.schema.properties[propName],
      validations: (this.validations && this.validations[propName]) || {},
      uiSchema,
      ...customProps
    }
  }

  getWrapperProps (propName: string, propValue: ISchema) {
    const propUiScehma = (this.uiSchema && this.uiSchema.properties && this.uiSchema.properties[propName]) || undefined

    const customProps = this.wrapperComponent && this.wrapperComponent.props ? this.wrapperComponent.props(propName, propValue, propUiScehma) : {}

    return {
      error: propValue.type !== 'object' ? this.validationErrors[propName] : '',
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
