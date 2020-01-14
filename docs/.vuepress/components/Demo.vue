<template>
  <div class="demo">
    <div class="tabs">
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
      <pre v-highlightjs="activeTab === 'JSON Schema' ? stringifiedSchema : formattedValue"><code class="json"></code></pre>
      <ClientOnly>
        <JsonSchema
          class="json-schema-demo"
          :schema="schema"
          :ui-schema="uiSchema"
          v-model="value"
          @init-default="handleDefaultValue"
        />
      </ClientOnly>
    </div>

  </div>
</template>

<script>
import schemas from '../schemas'

export default {
  props: {
    schemaName: {
      type: String,
      required: true
    },
    uiSchema: {
      type: Object,
      default: () => ({})
    },
    useDefaults: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    value: {},
    activeTab: 'Data Model'
  }),
  computed: {
    schema() {
      return schemas[this.schemaName]
    },
    stringifiedSchema() {
      return JSON.stringify(this.schema, null, 2)
    },
    tabs() {
      const tabs =  ['Data Model', 'JSON Schema']
      if (Object.keys(this.uiSchema).length) tabs.push('UI Schema')
      return tabs
    },
    formattedValue() {
      return JSON.stringify(this.value, null, 2)
    }
  },
  methods: {
    handleDefaultValue(value) {
      if (this.useDefaults) this.value = value
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
  opacity: 0.7
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
      width: 50%;
    }

    .content {
      flex-direction: row;
    }

  }
</style>
