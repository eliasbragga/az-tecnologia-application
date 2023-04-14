import { mount, shallowMount } from '@vue/test-utils'
import Login from '../index.vue'

describe('HelloWorld.vue', () => {
  it.only('renders props.msg when passed', () => {
    const wrapper = mount(Login)
    console.log('sas')
    expect(wrapper.vm).toBeDefined()
  })
})
