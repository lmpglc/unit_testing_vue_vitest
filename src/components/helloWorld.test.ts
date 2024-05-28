import { shallowMount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import HelloWorld from './HelloWorld.vue'
import axios from 'axios'

// hay que mockear axios
vi.mock('axios')

describe('HelloWorld test suites', () => {
  globalThis.fetch = vi.fn()
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
})
