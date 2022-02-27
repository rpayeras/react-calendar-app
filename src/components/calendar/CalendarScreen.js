import React, { useState } from 'react'
import { Navbar } from '../ui/Navbar'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import {messages} from '../../helpers/calendar-messages'

import moment from 'moment'
import 'moment/locale/es';

import 'react-big-calendar/lib/css/react-big-calendar.css'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'

moment.locale('es')
const localizer = momentLocalizer(moment)

const events = [
  {
    title: 'Test 1',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgcolor: '#FAFAFA',
    notes: 'notes of event',
    user: {
      _id: '123',
      name: 'User'
    }
  },
  {
    title: 'Test 2',
    start: moment().add(1, 'days').toDate(),
    end: moment().add(2, 'days').toDate(),
    bgcolor: '#FAFAFA',
    notes: 'notes of event',
    user: {
      _id: '123',
      name: 'User'
    }
  },
]

export const CalendarScreen = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')
  
  const onDoubleClick = (e) => {
    console.log(e)
  }

  const onViewChange = (e) => {
    localStorage.setItem('lastView', e)
    setLastView(e)
  }

  const onSelectEvent = (e) => {
    console.log(e)
  }

  const eventStyleGetter = (event, start, end, isSelected) => {
    console.log(event, start, end, isSelected)

    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white'
    }

    return {
      style
    }
  }

  return (
    <section className="calendar-screen">
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        components={{
          event: CalendarEvent
        }}
        view={lastView}
      />
      <CalendarModal />
    </section>
  )
}
