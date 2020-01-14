export default {
  order: {
    properties: {
      c: { order: 3 },
      b: { order: 2 },
      a: { order: 1 }
    }
  },
  radio: {
    properties: {
      a: {
        uiType: 'radio'
      }
    }
  },
  selectTitles: {
    properties: {
      a: {
        titles: ['custom title', 'second', 'third one']
      }
    }
  }
}
