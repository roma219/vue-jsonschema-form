<template>
  <div class="json-schema-wrapper">
    <div
      v-for="[propName, propValue] in Object.entries(schema.properties)"
      class="form-group"
      :key="propName"
    >
      <div>{{ propName }}</div>
      <component
        :is="propValue.__component__"
        v-bind="getProps(propName, propValue)"
        @[getEventName(propValue)]="handleChange(propName, $event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

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

  get wrapperComponentName () {
    return 'InputWrapper'
  }

  getEventName (propValue : any) {
    return propValue.__eventName__
  }

  handleChange (propName: string, newValue: any) {
    const path = this.schema.properties[propName].type === 'object' ? [propName, ...newValue.path] : [propName]
    const value = this.schema.properties[propName].type === 'object' ? newValue.value : newValue
    this.$emit('input', { path, value })
  }

  getProps (propName: string, propValue: any) {
    const customProps = propValue.__props__ ? propValue.__props__(propValue) : {}

    return {
      value: this.value[propName],
      schema: this.schema.properties[propName],
      ...customProps
    }
  }
}
</script>

<style>
.json-schema-wrapper .form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  align-items: flex-start
}
</style>
