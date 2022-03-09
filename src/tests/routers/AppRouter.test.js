import React from 'react'
import { mount } from "enzyme"
import { Provider } from "react-redux"

import configureStore from "redux-mock-store"
import thunk from "redux-thunk"

import { AppRouter } from '../../routers/AppRouter'
import { MemoryRouter } from 'react-router'
import { createMemoryHistory } from 'history'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('Testing AppRouter', () => { 
    test('should render', () => { 
        const initState = {
            auth: {
                checking: false
            }
        }

        let store = mockStore(initState);
        const history = createMemoryHistory()

        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <AppRouter />
                </MemoryRouter>
            </Provider>
        )

        expect(wrapper).toMatchSnapshot()
    })

    test('should render public screen', () => { 
        const initState = {
            auth: {
                checking: false
            },
            calendar: {
                events: []
            },
            ui: {
                modalOpen: false
            }
        }

        let store = mockStore(initState);
        const history = createMemoryHistory()

        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <AppRouter />
                </MemoryRouter>
            </Provider>
        )

        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('.login-container').exists()).toBe(true)
    })

    test('should render private route', () => { 
        const initState = {
            auth: {
                checking: false,
                uid: 1234
            },
            calendar: {
                events: []
            },
            ui: {
                modalOpen: false
            }
        }

        let store = mockStore(initState);
        const history = createMemoryHistory()

        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <AppRouter />
                </MemoryRouter>
            </Provider>
        )

        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('.calendar-screen').exists()).toBe(true)
    })


 })
 