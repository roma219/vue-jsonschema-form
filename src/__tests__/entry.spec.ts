import entry from '../entry'
import { shallowMount } from '@vue/test-utils'

describe('entry.ts', () => {
  it('should be a vue component', () => {
    const wrapper = shallowMount(entry, { propsData: { schema: {} } })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
