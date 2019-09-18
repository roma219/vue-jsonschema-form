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
