<template>
  <div>
    <!-- <div class="tabs">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{ 'active': activeTab === tab }"
        @click="activeTab = tab"
      >
        {{ tab }}
      </div>
    </div> -->
    <!-- <Content slot-key="name"/> -->
    <SourceCode title="Schema">
      <slot></slot>
    </SourceCode>
    <div class="content">
      <!-- <pre v-highlightjs="schema">
        <code class="javascript"></code>
      </pre> -->
      <!-- <div v-highlightjs="schema"><code class="javascript">{{ schema }}</code></div> -->
      <JsonSchema
        class="json-schema-demo"
        :schema="schema"
        :ui-schema="uiSchema"
        v-model="value"/>
      </JsonSchema>
    </div>

  </div>
</template>

<script>
// import testSchema from '../schemas/testSchema.js'
const testSchema = {
  type: 'object',
  properties: {
    aaa: { type: 'number', maximum: 10 },
    arr: {
      type: 'array',
      items: { type: 'object', properties: { a: { type: 'string', minLength: 2 }, b: { type: 'boolean' } } }
    },
    bbb: { type: 'boolean' },
    ccc: { type: 'string', enum: ['1', '2', '3'] },
    ddd: {
      type: 'object',
      title: '',
      properties: {
        a1: { type: 'string', minLength: 1, maxLength: 5 },
        b2: { type: 'boolean', default: true },
        ddd: {
          type: 'object',
          properties: {
            a1: { type: 'string', default: 'aaa' },
            b2: { type: 'boolean' }
          }
        }
      }
    }
  },
  if: {
    properties: {
      aaa: {
        const: 10
      }
    }
  },
  then: {
    properties: {
      newField: { type: 'string' }
    }
  }
}

export default {
  props: {
    // schema: {
    //   type: Object,
    //   required: true,
    // },
    uiSchema: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    value: {},
    activeTab: 'Data'
  }),
  computed: {
    schema() {
      return testSchema
    },
    stringifiedSchema() {
      return JSON.stringify(this.schema, null, 2)
    },
    tabs() {
      const tabs =  ['Data', 'JSON Schema']
      if (Object.keys(this.uiSchema).length) tabs.push('UI Schema')
      return tabs
    }
  }
}
</script>

<style scoped>
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
  justify-content: space-between;
}

.content pre {
  flex-grow: 1;
}

.json-schema-demo {
  margin-top: 15px;
  /* width: 50%; */
}
</style>
