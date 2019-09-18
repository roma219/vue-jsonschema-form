<template>
  <div class="json-schema-wrapper">
    json schema components
    <div
      v-for="[propName, propValue] in Object.entries(testSchema.properties)"
      :key="propName"
    >
      <component
        :is="propValue.__component__"
        :value="testValue[propName]"
        @[getEventName(propValue)]="handleChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'JsonSchema',
  components: {
    TextInput: () => import('@/components/TextInput.vue'),
    Checkbox: () => import('@/components/Checkbox.vue')
  }
})
export default class JsonSchema extends Vue {
  testSchema = {
    type: 'object',
    properties: {
      aaa: { type: 'string', __component__: 'TextInput' },
      bbb: { type: 'boolean', __component__: 'Checkbox' }
    }
  }

  testValue = {
    aaa: '123asd',
    bbb: true
  }

  getEventName (propValue : any) {
    return propValue.__eventName__ || 'input'
  }

  handleChange () {
    console.log('kek')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
