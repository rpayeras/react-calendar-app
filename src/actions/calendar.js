import { types } from "../types/types"
import {fetchWithToken} from "../helpers/fetch"
import { prepareEvents } from "../helpers/prepareEvents";
import Swal from "sweetalert2";

export const eventStartLoading = () => {
    return async (dispatch) => {

        try{
            const res = await fetchWithToken('events')
            const {ok, data} = await res.json()


            if(ok){
                let events = prepareEvents(data)
                dispatch(eventLoaded(events))
            }
        } catch(err) {
            console.log(err)
        }
    }
}

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})

export const eventStartAddNew = (event) => {
    return async(dispatch, getState) => {
        const {uid, name} = getState().auth;

        try{
            const res = await fetchWithToken('events', event, 'POST')
            const {ok, data} = await res.json();

            if(ok){
                event.id = data.id;
                event.user = {
                    _id: uid,
                    name
                }

                dispatch(eventAddNew(event))
            }
        } catch (err) {
            console.log(err);
        }
    }
}

export const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
})

export const eventSetCurrent = (event) => ({
    type: types.eventSetCurrent,
    payload: event
});

export const eventCleanCurrent = (event) => ({
    type: types.eventCleanCurrent,
});

export const eventStartUpdateCurrent = (event) => {
    return async(dispatch) => {
        try{
            const res = await fetchWithToken(`events/${event.id}`, event, 'PUT')
            const body = await res.json()

            if(body.ok){
                dispatch(eventUpdateCurrent(event))
            } else {
                Swal.fire('Error', body.msg, 'error')
            }
        } catch(err){
            console.log(err)
        }
    }
}

export const eventUpdateCurrent = (event) => ({
    type: types.eventUpdateCurrent,
    payload: event
});

export const eventStartDelete = () => {
    return async(dispatch, getState) => {
        const {id} = getState().calendar.current
        
        try{
            const res = await fetchWithToken(`events/${id}`, {}, 'DELETE')
            const body = await res.json()

            if(body.ok){
                dispatch(eventDelete())
            } else {
                Swal.fire('Error', body.msg, 'error')
            }
        } catch(err){
            console.log(err)
        }
    }
}

export const eventDelete = () => ({
    type: types.eventDelete
})

export const eventLogout = () => ({
    type: types.eventLogout
})