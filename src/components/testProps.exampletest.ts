import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import HelloWorld from './HelloWorld.vue'

describe('HelloWorld.vue', () => {

  it('should render the msg property', () => {
    const wrapper = mount(HelloWorld, { 
        props: { 
            msg: 'Test OK',
            otra: "223"

        } 
    })
    expect(wrapper.find("h1").text()).toBe('Test OK')
  })

  it('should increment count when the increment method is called', () => {
    //WHITEBOX METHOD-> MAL POR SER MAS RIGIDO
    const instance = mount(HelloWorld)
    instance.vm.increment()
    expect(instance.vm.count).toBe(1)
  })

  it('should increment count and display it', async () => {
    //BLACKBOX METHOD-> MEJOR PORQUE TE VAS A METODOS GENERALES BUSCAS EL EVENTO "CLICK" EN VEZ DEL NOMBRE DE LA FUNCION COMO ARRIBA
    const instance = mount(HelloWorld)
    
    const button = instance.find("button")

    await button.trigger("click")

    expect(button.text()).toBe("count is 1")
    
  })

})
