<template>
  <div class="input-wrapper">
    <div class="input-wrapper-title">{{ title }}</div>
    <slot/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'InputWrapper'
})
export default class InputWrapper extends Vue {
  @Prop({ default: '' }) protected title!: string
}
</script>

<style>
.input-wrapper {
  margin-bottom: 15px;
}

.input-wrapper-title {
  font-size: 12px;
  font-weight: bold;
}
</style>
