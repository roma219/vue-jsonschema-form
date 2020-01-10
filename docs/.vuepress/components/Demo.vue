<template>
  <div class="demo">
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
    <SourceCode>
      <slot></slot>
    </SourceCode>
    <div class="content">
      <!-- <div v-highlightjs="schema"><code class="javascript">{{ schema }}</code></div> -->
      <JsonSchema
        class="json-schema-demo"
        :schema="schema"
        :ui-schema="uiSchema"
        v-model="value"
        @init-default="value = $event"
      />
      <pre v-highlightjs="formattedValue"><code class="javascript"></code></pre>
    </div>

  </div>
</template>

<script>
const testSchema = {
  type: 'object',
  properties: {
    a: { type: 'string', title: 'Text Input' },
    b: { type: 'number', title: 'Digits Only' },
    c: { type: 'boolean', default: true }
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
    },
    formattedValue() {
      return JSON.stringify(this.value, null, 2)
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
