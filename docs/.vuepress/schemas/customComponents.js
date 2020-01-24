export default {
  type: 'object',
  properties: {
    a: { title: 'Name', type: 'string', description: 'Very important field' },
    confirm: { type: 'boolean' },
    c: { title: 'Planet', type: 'string', enum: ['Earth', 'Mars', 'Jupiter'], default: 'Mars' },
    date: { type: 'string' }
  }
}
