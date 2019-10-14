<template>
  <input class="schema-text-input" type="text" @input="handleInput" :value="value">
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

<style>
.schema-text-input {
  width: 100%;
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  height: 35px;
  font: 400 14px system-ui;
  line-height: 35px;
  padding: 0 15px;
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}
.schema-text-input:focus {
  outline: none;
  border-color: #409eff;
}
</style>
