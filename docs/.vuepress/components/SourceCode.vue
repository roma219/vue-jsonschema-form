<template>
  <div class="source-code">
    <div class="header" @click="expanded = !expanded">
      <h3 class="title">{{ title }}</h3>
      <div class="expand-btn" :class="{ 'expand-btn--expanded': expanded }">▲</div>
    </div>
    <slot v-if="expanded"></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false
    }
  },
  data: () => ({
    expanded: false
  })
}
</script>

<style scoped>
.source-code {
  margin-bottom: 10px;
}

.title {
  font-weight: bold;
  border-bottom: 1px dashed #333;
}

.source-code .header {
  display: flex;
  align-items: baseline;
  cursor: pointer;
  user-select: none;
}

.expand-btn {
  transition: transform 0.2s;
  margin-left: 10px;
  font-size: 15px;
  transform: rotate(180deg);
}

.expand-btn--expanded {
  transform: none;
}
</style>
