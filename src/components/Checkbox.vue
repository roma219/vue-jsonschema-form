<template>
  <input type="checkbox" @input="handleInput" :value="value">
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'TextInput'
})
export default class TextInput extends Vue {
  @Prop({ default: '' }) protected value!: string

  handleInput (evt) {
    const { value } = evt.target
    this.$emit('input', value)
  }
}
</script>

<style>
</style>
