<template>
<div>
  <div v-for="(option, index) in options" :key="index">
    <label :for="option + 'radio'">
      <input
        type="radio"
        name="radio1"
        :checked="value + '' === option"
        :id="option + 'radio'"
        :value="option"
        @input="handleInput"
      >
      {{ option }}
    </label>
  </div>
</div>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'Radio'
})
export default class Select extends Vue {
  @Prop({ default: '' }) readonly value!: any
  @Prop({ default: () => ([]) }) readonly options!: Array<any>

  handleInput ({ target }: { target: HTMLInputElement }) {
    const { value } = target
    this.$emit('input', value)
  }
}
</script>
