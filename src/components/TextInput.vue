<template>
  <input type="text" @input="handleInput" :value="value">
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'TextInput'
})
export default class TextInput extends Vue {
  @Prop({ default: '' }) readonly value!: string

  handleInput ({ target }: { target: HTMLInputElement }) {
    const { value } = target
    this.$emit('input', value)
  }
}
</script>
