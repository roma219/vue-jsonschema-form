<template>
    <component :is="wrapperComponentName" class="demo">
    <div class="tabs" v-if="showSource">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{ 'active': activeTab === tab }"
        @click="activeTab = tab"
      >
        {{ tab }}
      </div>
    </div>
    <div class="content">
      <pre v-highlightjs="codeContent" v-if="showSource"><code class="json"></code></pre>
        <JsonSchema
          class="json-schema-demo"
          :schema="schema"
          :ui-schema="uiSchema"
          :components="customComponents"
          :wrapper="wrapper"
          :use-default-styles="!useCustomComponents"
          v-model="value"
          @init-default="handleDefaultValue"
        />
    </div>

  </component>
</template>

<script>
import schemas from '../schemas'
import uiSchemas from '../ui-schemas'

export default {
  props: {
    schemaName: {
      type: String,
      required: true
    },
    useUiSchema: {
      type: Boolean,
      default: false
    },
    useDefaults: {
      type: Boolean,
      default: false
    },
    useCustomComponents: {
      type: Boolean,
      default: false
    },
    useCustomWrapper: {
      type: Boolean,
      default: false
    },
    showSource: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    value: {},
    activeTab: 'JSON Schema'
  }),
  computed: {
    schema() {
      return schemas[this.schemaName]
    },
    uiSchema() {
      return uiSchemas[this.schemaName]
    },
    tabs() {
      const tabs =  ['JSON Schema', 'Data Model']
      if (this.useUiSchema) tabs.push('UI Schema')
      return tabs
    },
    codeContent() {
      switch (this.activeTab) {
        case 'JSON Schema':
          return JSON.stringify(this.schema, null, 2)
          break
        case 'Data Model':
          return JSON.stringify(this.value, null, 2)
          break
        case 'UI Schema':
          return JSON.stringify(this.uiSchema, null, 2)
      }
    },
    customComponents() {
      return this.useCustomComponents ? [{
        componentName: 'VSelect',
        contains: 'enum',
        props: (propName, schema) => ({ label: schema.title || propName, items: schema.enum, outlined: true }),
        eventName: 'change'
      }, {
        componentName: 'VSwitch',
        matcher: { type: 'boolean' },
        eventName: 'change',
        props: (propName, schema) => ({ label: schema.title || propName })
      },{
        componentName: 'VTextField',
        matcher: { type: 'string' },
        props: (propName, schema) => ({ label: schema.title || propName, outlined: true, clearable: true, hint: schema.description, 'persistent-hint': true })
      }, {
        componentName: 'VDatePicker',
        uiSchemaMatcher: { uiType: 'datepicker' },
        eventName: 'change',
        props: (propName, schema) => ({ 'full-width': true })
      }] : []
    },
    customWrapper() {
      return {
        componentName: 'CustomWrapper',
        props: (propName, schema, uiSchema) => ({
          title: schema.title || propName
        })
      }
    },
    wrapper() {
      if (this.useCustomWrapper) return this.customWrapper
      return this.useCustomComponents ? { componentName: 'InputWrapper' } : undefined
    },
    wrapperComponentName() {
      return this.useCustomComponents ? 'v-app' : 'div'
    }
  },
  methods: {
    handleDefaultValue(value) {
      this.value = value
    }
  }
}
</script>

<style scoped>
.demo {
  margin: 10px 0;
}
.tabs {
  display: flex;
}
.tabs > div {
  margin-right: 10px;
  cursor: pointer;
  border-bottom: 1px dashed black;
  color: black;
  opacity: 0.7;
}

.tabs > div.active {
  font-weight: bold;
  opacity: 1;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.content pre {
  flex-grow: 1;
}

.json-schema-demo {
  margin-top: 15px;
}

@media (min-width: 800px) {

  .json-schema-demo {
    width: 45%;
    margin-left: 15px;
  }

  .content {
    flex-direction: row;
  }

}
</style>
