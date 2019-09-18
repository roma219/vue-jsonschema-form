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
        :value="value[propName]"
        :options="propValue.enum"
        :schema="schema && schema.properties && schema.properties[propName]"
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
    Select: () => import('@/components/Select.vue')
  }
})
export default class JsonSchemaForm extends Vue {
  @Prop({ required: true }) protected schema!: any
  @Prop({ default: () => ({}) }) protected value!: any

  getEventName (propValue : any) {
    return propValue.__eventName__
  }

  handleChange (propName: string, newValue: any) {
    const path = this.schema.properties[propName].type === 'object' ? [propName, ...newValue.path] : [propName]
    const value = this.schema.properties[propName].type === 'object' ? newValue.value : newValue
    this.$emit('input', { path, value })
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
