import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { LoginScreen } from '../components/auth/LoginScreen'
import { CalendarScreen } from '../components/calendar/CalendarScreen'

export const AppRouter = () => {
  return (
      <>
        <Routes>
            <Route path="/" element={<CalendarScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="*" element={<h1>404 Not found</h1>} />
        </Routes>
      </>
  )
}
