<template>
  <div>
    <h3 class="title">{{ title }}</h3>
    <button @click="expanded = !expanded">toggle</button>
    <slot v-if="expanded"></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data: () => ({
    expanded: true
  })
}
</script>

<style scoped>
.title {
  font-weight: bold;
}
</style>
