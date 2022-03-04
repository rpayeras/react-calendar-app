import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { startChecking } from '../actions/auth'
import { LoginScreen } from '../components/auth/LoginScreen'
import { CalendarScreen } from '../components/calendar/CalendarScreen'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(startChecking())
  }, [dispatch])

  if(checking) {
    return (<h5>Loading...</h5>)
  }

  return (
      <>
        <Routes>
          <Route path="/" element={<PrivateRoute isAuthenticated={!!uid} />} >
            <Route exact path='/' element={<CalendarScreen/>}/>
          </Route>
          <Route path="/login" element={<PublicRoute isAuthenticated={!!uid} />} >
            <Route path='/login' element={<LoginScreen/>}/>
          </Route>
          {/* <Route path="*" element={<h1>404 Not found</h1>} /> */}
        </Routes>
      </>
  )
}
