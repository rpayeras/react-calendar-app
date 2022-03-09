import React from 'react'
import { mount } from "enzyme"
import { Provider } from "react-redux"

import configureStore from "redux-mock-store"
import thunk from "redux-thunk"

import { DeleteEventFab } from '../../components/ui/DeleteEventFab'
import { eventStartDelete } from '../../actions/calendar'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {}

let store = mockStore(initState);
store.dispatch = jest.fn()

jest.mock('../../actions/calendar', () => ({
    eventStartDelete: jest.fn()
}));

const wrapper = mount(
    <Provider store={store}>
        <DeleteEventFab />
    </Provider>
)

describe('Testing DeleteEventFab component', () => { 

    beforeEach(() => {
        store = mockStore(initState)
        jest.clearAllMocks()
    })

    test('should render', () => { 
        expect(wrapper).toMatchSnapshot()
     })

     test('should dispatch eventStartDelete', () => {
         wrapper.find('button').prop('onClick')()

         expect(eventStartDelete).toHaveBeenCalled()
     })
 })