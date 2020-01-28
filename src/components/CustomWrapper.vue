<template>
  <div class="custom-wrapper">
    <div class="title">{{ title }}</div>
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'CustomWrapper',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
.custom-wrapper {
  margin-bottom: 22px;
  display: flex;
  align-items: baseline;
  justify-content: baseline;
}

.custom-wrapper .title {
  width: 110px;
  text-align: right;
  margin-right: 15px;
}
</style>
