<template>
  <div
    class="json-schema-array-item"
  >
    <div class="json-schema-array-item-controls">
      <span v-if="index" @click="$emit('swap-up')">up   |</span>
      <span v-if="index < length -1" @click="$emit('swap-down')">down |</span>
      <span @click="$emit('remove')">x</span>
    </div>
    <slot/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'JsonSchemaArrayFormWrap'
})
export default class JsonSchemaArrayFormWrap extends Vue {
  @Prop({ required: true }) readonly index!: number
  @Prop({ required: true }) readonly length!: number
}
</script>
