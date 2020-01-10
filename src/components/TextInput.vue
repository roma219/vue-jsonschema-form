<template>
  <input
    type="text"
    v-restrict.number="{isNumber, isNegative, isFloat}"
    :value="value"
    @input="handleInput"
  >
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import restrict from './restrict-directive'

@Component({
  name: 'TextInput',
  directives: { restrict }
})
export default class TextInput extends Vue {
  @Prop({ default: '' }) readonly value!: string
  @Prop({ default: 'string' }) readonly type!: string

  get isNumber () : boolean {
    return this.type === 'number' || this.type === 'float'
  }

  get isFloat () : boolean {
    return this.type === 'float'
  }

  get isNegative () : boolean {
    return true
  }

  handleInput ({ target }: { target: HTMLInputElement }) {
    let { value } = target
    if (this.isNumber && !value) {
      this.$emit('input', undefined)
      return
    }
    this.$emit('input', this.isNumber && value ? parseInt(value) : value)
  }
}
</script>
