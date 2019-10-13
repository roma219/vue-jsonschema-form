<template>
  <div class="input-wrapper" :class="{ 'input-wrapper--vertical': vertical }">
    <div class="input-wrapper-title" :class="{ 'input-wrapper-title--empty': !title}">{{ title }}</div>
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
  @Prop({ default: '' }) readonly title!: string
  @Prop({ default: '' }) readonly error!: string
  @Prop({ default: false }) readonly vertical!: boolean
}
</script>

<style>
.input-wrapper {
  margin-bottom: 22px;
  position: relative;
  display: flex;
  align-items: baseline;
}

.input-wrapper--vertical {
  flex-direction: column;
  margin-bottom: 0;
}

.input-wrapper-title {
  font-size: 14px;
  width: 100px;
  text-align: right;
  flex-shrink: 0;
  margin-right: 10px;
  /* align-items: baseline; */
}

.input-wrapper-title--empty {
  display: none;
}

.input-wrapper--vertical > .input-wrapper-title {
  font-weight: bold;
  margin-bottom: 10px;
}

.input-wrapper-error {
  position: absolute;
  bottom: -17px;
  left: 110px;
  font-size: 12px;
  color: red;
  line-height: 15px;
}
</style>
