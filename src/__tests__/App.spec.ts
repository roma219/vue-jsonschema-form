import App from '../App.vue'
import { shallowMount } from '@vue/test-utils'

describe('App.vuenpm', () => {
  it('should be vue component', () => {
    const wrapper = shallowMount(App)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
