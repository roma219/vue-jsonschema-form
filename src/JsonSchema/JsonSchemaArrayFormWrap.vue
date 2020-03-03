<template>
  <div class="json-schema-array-item">
    <div class="json-schema-array-item-controls">
      <label>{{ index + 1 }})</label>
      <button v-if="index" @click="$emit('swap-up')">▲</button>
      <button v-if="index < length -1" @click="$emit('swap-down')">▼</button>
      <button @click="$emit('remove')">✕</button>
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

<style>
.json-schema-array-item {
  margin-bottom: 25px;
}

.json-schema-array-item-controls {
  margin-bottom: 10px;
}

.json-schema-array-item-controls button {
  margin-right: 5px;
}
</style>
