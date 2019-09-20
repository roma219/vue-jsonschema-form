<template>
  <JsonSchemaForm
    :schema="processedSchema"
    :value="value"
    @input="handleChange"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import JsonSchemaForm from './JsonSchemaForm.vue'
import cloneDeep from 'lodash/cloneDeep'
import { processSchema } from '@/utils/processSchema'

@Component({
  name: 'JsonSchema',
  components: {
    JsonSchemaForm
  }
})
export default class JsonSchema extends Vue {
  @Prop({ required: true }) protected schema!: any
  @Prop({ default: () => ({}) }) protected value!: any

  handleChange ({ path, value } : { path: Array<string>, value: any }) {
    const newValue = cloneDeep(this.value)
    const paramName = path.pop() || ''

    let target = newValue
    path.forEach(paramName => {
      if (!target[paramName]) target[paramName] = {}

      target = target[paramName]
    })

    target[paramName] = value

    this.$emit('input', newValue)
  }

  get processedSchema () {
    return processSchema(this.schema)
  }
}
</script>
