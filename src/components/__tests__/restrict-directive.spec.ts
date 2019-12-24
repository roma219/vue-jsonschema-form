import directive from '../restrict-directive'

describe('Restrict input directive', () => {
  it('should have bind property', () => {
    expect(typeof directive).toBe('object')
    expect(directive.bind).toBeDefined()
  })

  it('prevents non-numbers when corresponding modifier is provided', () => {
    const mockedPreventDefaultClb = jest.fn()
    const input = document.createElement('input');
    input.type = 'text';

    directive.bind(input, { value: { isNumber: true }, modifiers: { number: true } })

    let event = new KeyboardEvent('keydown', { 'keyCode': 50 } as any)
    event.preventDefault = mockedPreventDefaultClb
    input.dispatchEvent(event)

    expect(mockedPreventDefaultClb.mock.calls.length).toBe(0);

    event = new KeyboardEvent('keydown', { 'keyCode': 2 } as any)
    event.preventDefault = mockedPreventDefaultClb
    input.dispatchEvent(event)
    expect(mockedPreventDefaultClb.mock.calls.length).toBe(1);

  })

  it('doesnt prevent non-numbers when corresponding modifier is not provided', () => {
    const mockedPreventDefaultClb = jest.fn()
    const input = document.createElement('input');
    input.type = 'text';

    directive.bind(input, { value: { isNumber: true }, modifiers: { } })

    let event = new KeyboardEvent('keydown', { 'keyCode': 50 } as any)
    event.preventDefault = mockedPreventDefaultClb
    input.dispatchEvent(event)

    expect(mockedPreventDefaultClb.mock.calls.length).toBe(1);

    event = new KeyboardEvent('keydown', { 'keyCode': 2 } as any)
    event.preventDefault = mockedPreventDefaultClb
    input.dispatchEvent(event)
    expect(mockedPreventDefaultClb.mock.calls.length).toBe(2);
  })

  it('doesnt stop period symbol when corresponding modifier is provided', () => {
    const mockedPreventDefaultClb = jest.fn()
    let input = document.createElement('input')
    input.type = 'text'

    directive.bind(input, { value: { isNumber: true }, modifiers: { decimal: true } })

    let event = new KeyboardEvent('keydown', { 'keyCode': 110 } as any)
    event.preventDefault = mockedPreventDefaultClb
    input.dispatchEvent(event)

    expect(mockedPreventDefaultClb.mock.calls.length).toBe(0)

    input = document.createElement('input')
    input.type = 'text';
    directive.bind(input, { value: { isNumber: true }, modifiers: {} })

    event = new KeyboardEvent('keydown', { 'keyCode': 110 } as any)
    event.preventDefault = mockedPreventDefaultClb
    input.dispatchEvent(event)
    expect(mockedPreventDefaultClb.mock.calls.length).toBe(1)
  })

  it('escapes minus as first symbol when corresponding option is provided', () => {
    const mockedPreventDefaultClb = jest.fn()
    let input = document.createElement('input')
    input.type = 'text';

    directive.bind(input, { value: { isNumber: true }, modifiers: { decimal: true } })

    let event = new KeyboardEvent('keydown', { 'keyCode': 189 } as any)
    event.preventDefault = mockedPreventDefaultClb
    input.dispatchEvent(event)

    expect(mockedPreventDefaultClb.mock.calls.length).toBe(1)

    input = document.createElement('input')
    input.type = 'text'
    input.value = '123'
    input.selectionStart = 2
    directive.bind(input, { value: { isNumber: true, negativeNumber: true }, modifiers: {} })

    event = new KeyboardEvent('keydown', { 'keyCode': 189 } as any)
    event.preventDefault = mockedPreventDefaultClb
    input.dispatchEvent(event)
    expect(mockedPreventDefaultClb.mock.calls.length).toBe(2);

    input = document.createElement('input')
    input.type = 'text';
    directive.bind(input, { value: { isNumber: true, negativeNumber: true }, modifiers: {} })

    event = new KeyboardEvent('keydown', { 'keyCode': 189 } as any)
    event.preventDefault = mockedPreventDefaultClb
    input.value = '123'
    input.selectionStart = 0
    input.dispatchEvent(event)
    expect(mockedPreventDefaultClb.mock.calls.length).toBe(2)
  })
})
