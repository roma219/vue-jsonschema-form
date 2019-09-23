<template>
  <div class="json-schema-wrapper">
    <component
      :is="wrapperComponent.name"
      v-for="[propName, propSchema] in Object.entries(schema.properties)"
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
import { ISchema, IAnyObject } from '@/types'
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
  @Prop({ default: () => ({}) }) protected value!: IAnyObject

  get wrapperComponent () {
    return config.inputWrapper
  }

  getEventName (propValue : ISchema) {
    return propValue.__eventName__
  }

  getProps (propName: string, propValue: ISchema) {
    const customProps = propValue.__props__ ? propValue.__props__(propValue, {}) : {}

    return {
      value: this.value[propName],
      schema: this.schema.properties && this.schema.properties[propName],
      ...customProps
    }
  }

  getWrapperProps (propName: string, propValue: ISchema) {
    return this.wrapperComponent.props ? this.wrapperComponent.props(propName, propValue) : {}
  }

  handleInput (propName: string, newValue: any) {
    if (!this.schema.properties) return
    const path = this.schema.properties[propName].type === 'object' ? [propName, ...newValue.path] : [propName]
    const value = this.schema.properties[propName].type === 'object' ? newValue.value : newValue
    this.$emit('input', { path, value })
  }
}
</script>
