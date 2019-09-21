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
  @Prop({ required: true }) protected schema!: any
  @Prop({ default: () => ({}) }) protected value!: any

  get wrapperComponent () {
    return config.inputWrapper
  }

  getEventName (propSchema : any) {
    return propSchema.__eventName__
  }

  getProps (propName: string, propSchema: any) {
    const customProps = propSchema.__props__ ? propSchema.__props__(propSchema) : {}

    return {
      value: this.value[propName],
      schema: this.schema.properties[propName],
      ...customProps
    }
  }

  getWrapperProps (propName: string, propSchema: any) {
    return this.wrapperComponent.props ? this.wrapperComponent.props(propName, propSchema) : {}
  }

  handleInput (propName: string, newValue: any) {
    const path = this.schema.properties[propName].type === 'object' ? [propName, ...newValue.path] : [propName]
    const value = this.schema.properties[propName].type === 'object' ? newValue.value : newValue
    this.$emit('input', { path, value })
  }
}
</script>
