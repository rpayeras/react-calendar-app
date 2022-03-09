import React from 'react'
import { mount } from "enzyme"
import { Provider } from "react-redux"

import configureStore from "redux-mock-store"
import thunk from "redux-thunk"

import { CalendarScreen } from '../../../components/calendar/CalendarScreen'
import { messages as calendarMessages } from '../../../helpers/calendar-messages'
import { types } from '../../../types/types'

import { eventSetCurrent, eventStartDelete, eventStartLoading } from '../../../actions/calendar'
import { act } from '@testing-library/react'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {
    calendar: {
        events: []
    },
    auth: {
        uid: '123456'
    },
    ui: {
        modalOpen: false
    }
}

let store = mockStore(initState);
store.dispatch = jest.fn()
Storage.prototype.setItem = jest.fn()

jest.mock('../../../actions/calendar',() => ({
    eventStartDelete: jest.fn(),
    eventStartLoading: jest.fn(),
    eventSetCurrent: jest.fn(),
}))

const wrapper = mount(
    <Provider store={store}>
        <CalendarScreen />
    </Provider>
)

describe('Testing Calendar Screen', () => { 
    test('should render', () => { 
        expect(wrapper).toMatchSnapshot()
     })

     test('testing interactions on calendar', () => { 
        const calendar = wrapper.find('Calendar')

        const currentCalendarMessages = calendar.prop('messages')

        expect(currentCalendarMessages).toEqual(calendarMessages)

        calendar.prop('onDoubleClickEvent')();
        expect(store.dispatch).toHaveBeenCalledWith({
            type: types.uiOpenModal
        })

        calendar.prop('onSelectEvent')({
            start: 'test'
        });
        expect(eventSetCurrent).toHaveBeenCalledWith({
            start: 'test'
        })

        act(() => {
            calendar.prop('onView')('week')
            expect(Storage.prototype.setItem).toHaveBeenCalledWith('lastView', 'week')
        })
      })
 })