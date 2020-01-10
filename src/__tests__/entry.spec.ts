import entry from '../entry'
import { shallowMount } from '@vue/test-utils'
jest.mock('../JsonSchema/JsonSchema.vue')

describe('entry.ts', () => {
  it('should be a vue component', () => {
    const wrapper = shallowMount(entry)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
