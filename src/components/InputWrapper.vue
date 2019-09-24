<template>
  <div class="input-wrapper">
    <div class="input-wrapper-title">{{ title }}</div>
    <slot/>
    <div class="input-wrapper-error">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'InputWrapper'
})
export default class InputWrapper extends Vue {
  @Prop({ default: '' }) protected title!: string
  @Prop({ default: '' }) protected error!: string
}
</script>

<style>
.input-wrapper {
  margin-bottom: 15px;
  position: relative;
}

.input-wrapper-title {
  font-size: 12px;
  font-weight: bold;
}

.input-wrapper-error {
  position: absolute;
  bottom: -15px;
  font-size: 12px;
  color: red;
  line-height: 15px;
}
</style>
