import { shallowMount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import HelloWorld from './HelloWorld.vue'
import axios from 'axios'
import { createTestingPinia } from "@pinia/testing"
import { useAppStore } from '../stores/appStore'
import TitleComponent from './TitleComponent.vue'
import { HelloWorldProps } from '../models/helloWorld'

// hay que mockear axios
vi.mock('axios')

const createWrapper = (props?: HelloWorldProps) => shallowMount(HelloWorld, {props})

describe('HelloWorld test suites', () => {
  
  globalThis.fetch = vi.fn()
  /*
  it('should make a fetch call using correct url depending on msg property', async () => {
    // dado el componente helloWorld es montado
    const instance = shallowMount(HelloWorld)
    // SETEAR LAS PROPIEDADES TAMBIEN TARDA Y HAY QUE HACER UN AWAIT
    // cuando cambia la prop
    await instance.setProps({
      msg:'test'
    })

    // TAMBIEN PUEDO PONER ESTA LINEA PARA ESPERAR A QUE TERMINE LA ANTERIOR
    
    //await instance.vm.$nextTick()

    expect(fetch).toHaveBeenNthCalledWith(1,'https://example.com/test')

  })

  it('should call axios.get function with https://httpbin.org/get', async () => {
    // dado el componente helloWorld es montado
    const instance = shallowMount(HelloWorld)
    // SETEAR LAS PROPIEDADES TAMBIEN TARDA Y HAY QUE HACER UN AWAIT
    // cuando cambia la prop
    await instance.setProps({
      msg:'test'
    })

    // TAMBIEN PUEDO PONER ESTA LINEA PARA ESPERAR A QUE TERMINE LA ANTERIOR
    
    //await instance.vm.$nextTick()

    expect(axios.get).toHaveBeenNthCalledWith(1,'https://httpbin.org/get')

  })
  */
  it('should dispacth changeMessage with "test" if msg property changes as "test"', async () => {
    // dado el componente helloWorld es montado
    const wrapper = shallowMount(HelloWorld, {
      global:{
        plugins:[createTestingPinia()]
      }
    })

    const store = useAppStore()

    await wrapper.setProps({
      msg: 'test'

    })

    expect(store.changeMessage).toHaveBeenNthCalledWith(1,'test')

  })

  it('should bind the msg property with a prefix(My Title:) to TitleComponent)', () => {
    const wrapper = shallowMount(HelloWorld, {
      props:{
        msg: 'First section'
      }
    })

    const titleComponentWrapper = wrapper.findComponent(TitleComponent)

    expect(titleComponentWrapper.props('value')).toBe('My Title: First section')

  })

  // esto es lo mismo que hacer dos test uno pero lo hacemos por variables
  test.each([
    {msg: 'First section', titleComponentExists: true}
    // {msg: undefined, titleComponentExists: false},
    // {msg: '', titleComponentExists: false}
  ])('msg: $msg -> titleComponentExists: $titleComponentExists', ({msg, titleComponentExists}) => {
    const wrapper = shallowMount(HelloWorld, {
      props:{
        msg: msg
      }
    })

    const titleComponentWrapper = wrapper.findComponent(TitleComponent)

    expect(titleComponentWrapper.exists()).toBe(titleComponentExists)

  })

  // vamos a testear qeu tenga una clase
  test.each([
    {msg: 'First section', successClassExits: false},
    {msg: undefined, successClassExits: true},
    {msg: '', successClassExits: true}
  ])('msg: $msg -> successClassExits: $successClassExits', ({msg, successClassExits}) => {
    const wrapper = shallowMount(HelloWorld, {
      props:{
        msg: msg
      }
    })

    const cardElementWrapper = wrapper.find<HTMLDivElement>('.card-success')

    expect(cardElementWrapper.exists()).toBe(successClassExits)

  })

  // hacemos los test de arriba pero de una manera mas
  test.each([
    {msg: 'First section', titleComponentStyle: undefined},
    {msg: undefined, titleComponentStyle: 'display: none;'},
    {msg: '', titleComponentStyle: 'display: none;'}
  ])('msg: $msg -> titleComponentStyle: $titleComponentStyle', ({msg, titleComponentStyle}) => {
    const wrapper = shallowMount(HelloWorld, {
      props:{
        msg: msg
      }
    })

    const titleComponentWrapper = wrapper.findComponent(TitleComponent)

    expect(titleComponentWrapper.element.attributes.getNamedItem('style')?.value).toBe(titleComponentStyle)

  })
  it('should emit card-clicked when the card is clicked', async () => {
    const wrapper = createWrapper()
    const card = wrapper.find('.card')
    
    await card.trigger('click')

    expect(wrapper.emitted('card-clicked')).toBeTruthy()
  })

  it('should emit up event tittle component emit on-mounted event', () => {
    const wrapper = createWrapper()
    
    const titleComponentWrapper = wrapper.findComponent(TitleComponent)
    
    titleComponentWrapper.vm.$emit('on-mounted')

    expect(wrapper.emitted('up')).toBeTruthy()
    expect(wrapper.emitted('up')).toHaveLength(1)
    expect(wrapper.emitted('up')?.[0][0]).toBe(0)
  })
})
