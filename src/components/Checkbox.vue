<template>
  <input type="checkbox" @input="handleInput" :value="value">
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'Checkbox'
})
export default class Checkbox extends Vue {
  @Prop({ default: '' }) protected value!: string

  handleInput ({ target }: { target: HTMLInputElement }) {
    const { value } = target
    this.$emit('input', value)
  }
}
</script>

<style>
</style>
