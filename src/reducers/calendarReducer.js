import { types } from "../types/types";

// {
//     id: new Date().getTime(),
//     title: 'Test 1',
//     startDate: moment().minutes(0).seconds(0).toDate(),
//     endDate: moment().minutes(0).seconds(0).add(2, 'hours').toDate(),
//     bgcolor: '#FAFAFA',
//     notes: 'notes of event',
//     user: {
//         _id: '123',
//         name: 'User'
//     }
// },

const initialState = {
    events: [],
    current: null,
}

export const calendarReducer = ((state = initialState, action) => {
    switch(action.type){
        case types.eventSetCurrent:
            return {
                ...state,
                current: action.payload
            }
        case types.eventCleanCurrent:
            return {
                ...state,
                current: initialState.current
            }
        case types.eventAddNew:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
            }
        case types.eventUpdateCurrent:
            return {
                ...state,
                events: [
                    ...state.events.map(event => {
                        if(event.id === action.payload.id){
                            return action.payload
                        }

                        return event;
                    })
                ]
            }
        case types.eventDelete:
            return {
                ...state,
                events: [
                    ...state.events.filter((event) => {
                        return (event.id !== state.current.id)
                    })
                ],
                current: null
            }
        case types.eventLoaded:
            return {
                ...state,
                events: [...action.payload],
            }
        case types.eventLogout:
            return {
                ...initialState
            }
        default:
            return state;
    }
})