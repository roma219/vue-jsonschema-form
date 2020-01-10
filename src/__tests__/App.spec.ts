import App from '../App.vue'
import { shallowMount } from '@vue/test-utils'
jest.mock('../JsonSchema/JsonSchema.vue')

describe('App.vuenpm', () => {
  it('should be vue component', () => {
    const wrapper = shallowMount(App)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
