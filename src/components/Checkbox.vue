<template>
  <input type="checkbox" @input="$emit('input')" :value="value">
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'TextInput'
})
export default class TextInput extends Vue {
  @Prop({ default: '' }) protected value!: string
}
</script>

<style>
</style>
