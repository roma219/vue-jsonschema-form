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
    <!-- <Content slot-key="name"/> -->
    <SourceCode>
      <slot></slot>
    </SourceCode>
    <div class="content">
      <!-- <pre><code>{{ schema }}</code></pre> -->
      <!-- <highlight-code lang="json">
        {{ stringifiedSchema }}
      </highlight-code> -->
      <!-- <pre class="language-json" v-html="stringifiedSchema">{{ schema }}</pre> -->
      <pre v-highlightjs="activeTab === 'JSON Schema' ? stringifiedSchema : formattedValue"><code class="json"></code></pre>
      <ClientOnly>
        <JsonSchema
          class="json-schema-demo"
          :schema="schema"
          :ui-schema="uiSchema"
          v-model="value"
        />
      </ClientOnly>
    </div>

  </div>
</template>

<script>
// import JsonSchema from '../../../src/JsonSchema/JsonSchema.vue'

const testSchema = {
  type: 'object',
  properties: {
    a: { type: 'string', title: 'Text Input' },
    b: { type: 'number', title: 'Digits Only' },
    c: { type: 'boolean', default: true }
  }
}

import schemas from '../schemas'

export default {
  // components: { JsonSchema: () => import('../../../src/JsonSchema/JsonSchema.vue') },
  props: {
    schemaName: {
      type: String,
      required: true
    },
    uiSchema: {
      type: Object,
      default: () => ({})
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
    stringifiedSchema() {
      return JSON.stringify(this.schema, null, 2)
    },
    tabs() {
      const tabs =  ['JSON Schema', 'Data Model']
      if (Object.keys(this.uiSchema).length) tabs.push('UI Schema')
      return tabs
    },
    formattedValue() {
      return JSON.stringify(this.value, null, 2)
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
}

.tabs > div.active {
  font-weight: bold;
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
