<template>
  <div class="pure-control-group" :class="{ 'pure-control-group--disabled' : disabled }">
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
  @Prop({ default: false }) readonly disabled!: boolean
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

.pure-control-group--disabled {
  opacity: 0.5;
  pointer-events: none;
}

.pure-form-message {
  color: #f14668!important;
}
</style>
