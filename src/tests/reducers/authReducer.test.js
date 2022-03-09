import { authReducer } from "../../reducers/authReducer"
import { types } from "../../types/types"

const initialState = {
    checking: false,
    // uid: null,
    // name: null
}

const testCredentials = {
    uid: '1234',
    name: 'testuser'
}

describe('Testing authReducer', () => {
    test('should return a default state', () => { 
        const state = authReducer(initialState, {})
        expect(state).toEqual({
            checking: false
        })
     })

     test('testing reducer authLogin', () => {
         const state = authReducer(initialState, {
             type: types.authLogin,
             payload: testCredentials
         })

         expect(state).toEqual({
            ...initialState,
            ...testCredentials,
            checking: false
        })
     })

     test('testing reducer authRegister', () => {
         const state = authReducer(initialState, {
             type: types.authRegister,
             payload: testCredentials
         })

         expect(state).toEqual({
            ...initialState,
            ...testCredentials,
        })
     })

     test('testing reducer authCheckingFinish', () => {
        const state = authReducer(initialState, {
            type: types.authCheckingFinish,
        })

        expect(state).toEqual({
           ...initialState,
       })
    })
})