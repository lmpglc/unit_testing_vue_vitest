import { shallowMount, mount } from "@vue/test-utils"
import App from "./App.vue"
import { describe, it, expect } from "vitest"

describe('App.vue', () => {
    it('should render the msg property', () => {
        const instance = mount(App)
        
        console.log(instance.html())

        expect(instance.html()).toContain("official Vue")
    })
})
