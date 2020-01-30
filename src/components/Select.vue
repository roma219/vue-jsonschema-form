<template>
  <select class="json-schema-form-select" @input="handleInput">
    <option style="display:none;" :selected="!value ? 'true' : 'false'"></option>
    <option
      v-for="(option, index) in options"
      :key="index"
      :selected="option === value ? 'true' : 'false'"
      :value="option"
    >
      {{ option }}
    </option>
  </select>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'Select'
})
export default class Select extends Vue {
  @Prop({ default: '' }) readonly value!: any
  @Prop({ default: () => ([]) }) readonly options!: Array<any>

  created () {
    if (!this.options.includes(this.value)) this.$emit('input', this.options[0])
  }

  handleInput ({ target } : { target: HTMLInputElement }) {
    const { value } = target
    this.$emit('input', value)
  }
}
</script>

<style>
.json-schema-form-select {
  -webkit-appearance: button;
}
</style>
