import { VueWrapper, shallowMount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import TitleComponent from './TitleComponent.vue'
import { TitleComponentProps } from '../models/titleComponent'

const createWrapper = (props?: TitleComponentProps) => shallowMount(TitleComponent, {props})

let wrapper = createWrapper()

describe('TitleComponent test suites', () => {

  beforeEach( () => {
    wrapper = createWrapper()
  })

  it('should display the title value', () => {
      const wrapper = shallowMount(TitleComponent, {
        props:{
          value: 'My Title'
        }
      })

      expect(wrapper.text()).toBe('My Title')
  })

  it('should emit on-mounted when the component is mounted', () => {
    expect(wrapper.emitted('on-mounted')).toBeTruthy()
})
})
    