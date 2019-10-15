<template>
  <!-- <div class="input-wrapper" :class="{ 'input-wrapper--vertical': vertical }">
    <div class="input-wrapper-title" :class="{ 'input-wrapper-title--empty': !title}">{{ title }}</div>
    <slot/>
    <div class="input-wrapper-error">{{ error }}</div>
  </div> -->

  <div class="pure-control-group">
      <label v-if="title">{{ title }}</label>
      <slot/>
      <span v-if="error" class="pure-form-message">{{ error }}</span>
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
  align-items: flex-start;
}

.input-wrapper-title {
  font-size: 14px;
  width: 100px;
  text-align: right;
  flex-shrink: 0;
  margin-right: 10px;
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
  bottom: -19px;
  left: 110px;
  font-size: 12px;
  color: rgb(219, 59, 33);
  line-height: 15px;
}

.pure-form-message {
  position: relative;
  left: 176px;
}
</style>
