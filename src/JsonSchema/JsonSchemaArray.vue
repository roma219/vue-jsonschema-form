<template>
  <div class="json-schema-array">
    <component
      :is="formWrapComponent"
      v-for="(item, index) in value"
      :key="index"
      :index="index"
      :length="value.length"
      @swap-up="swapItems(index, index-1)"
      @swap-down="swapItems(index, index+1)"
      @remove="removeItem(index)"
    >
      <JsonSchemaForm
        :schema="schema.items"
        :value="item"
        :validations="validations && validations.$each && validations.$each.$iter[index] || {}"
        @input="handleInput(index, $event)"
      />
    </component>
    <div @click="addNewItem">ADD NEW</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ISchemaArray, IUiSchema, IAnyObject, IConfig } from '@/types'
import { generateDefaultValue } from '@/utils/generateDefaultValue'
import JsonSchemaArrayFormWrap from './JsonSchemaArrayFormWrap.vue'

@Component({
  name: 'JsonSchemaArray',
  components: {
    JsonSchemaForm: () => import('./JsonSchemaForm.vue'),
    JsonSchemaArrayFormWrap
  }
})
export default class JsonSchemaArray extends Vue {
  @Prop({ required: true }) readonly schema!: ISchemaArray
  @Prop() readonly uiSchema!: IUiSchema
  @Prop({ default: () => ({}) }) readonly value!: IAnyObject[]
  @Prop() readonly validations!: any
  @Prop() readonly config!: IConfig

  get formWrapComponent () {
    return 'JsonSchemaArrayFormWrap'
  }

  handleInput (index: number, evt: { path: string[], value: any }) {
    this.$emit('input', {
      path: [`${index}`, ...evt.path],
      value: evt.value
    })
  }

  addNewItem () {
    const newItemData = generateDefaultValue(this.schema.items)

    this.$emit('input', {
      path: [],
      value: [...this.value, newItemData]
    })
  }

  removeItem (index: number) {
    const value = [ ...this.value ]
    value.splice(index, 1)

    this.$emit('input', { path: [], value })
  }

  swapItems (index1: number, index2: number) {
    const value = [ ...this.value ]
    value[index1] = value.splice(index2, 1, value[index1])[0]

    this.$emit('input', { path: [], value })
  }
}
</script>

<style>
.json-schema-array {
  width: 100%;
}
</style>
