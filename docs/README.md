# Vue JSON Schema Form
qwe123
<ClientOnly>
    <JsonSchema :schema="{
        type: 'object',
        properties: {
        aaa: { type: 'string', minLength: 1 },
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
        }
    }
    "/>
</ClientOnly>
