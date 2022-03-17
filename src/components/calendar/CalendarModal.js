import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment'
import { useForm } from '../../hooks/useForm';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventCleanCurrent, eventStartAddNew, eventStartUpdateCurrent } from '../../actions/calendar';
import { SaveIcon } from '@heroicons/react/solid';
  
    const modalStyles = {
        content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

if(process.env.NODE_ENV !== 'test') {
    Modal.setAppElement('#root');
}

const initEvent = {
    title: '',
    startDate: moment().minutes(0).seconds(0).add(1, 'hours').toDate(),
    endDate: moment().minutes(0).seconds(0).add(2, 'hours').toDate(),
    bgcolor: '#FAFAFA',
    notes: '',
    user: {
        id: '123qwe',
        name: 'User'
    }
}

export const CalendarModal = () => {
    const {current} = useSelector(state => state.calendar)
    
    const [formValues, setFormValue, resetForm] = useForm(initEvent)

    const {modalOpen} = useSelector(state => state.ui)
    const [titleValid, setTitleValid] = useState(true)
    const {id, startDate, endDate, title, notes} = formValues;

    const dispatch = useDispatch();

    useEffect(() => {
        if(current){
            resetForm(current)
        } else {
            resetForm()
        }
    }, [current])
    
    const handleClose = () => {
        dispatch(uiCloseModal())
        dispatch(eventCleanCurrent())
    }

    const handleStartDate = (e) => {
        setFormValue({
            target: {
                name: 'startDate',
                value: e
            }
        })
    }

    const handleEndDate = (e) => {
        setFormValue({
            target: {
                name: 'endDate',
                value: e
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const momentStart = moment(startDate)
        const momentEnd = moment(endDate)

        if(momentStart.isSameOrAfter(momentEnd)){
            Swal.fire('Error', 'Date end should be major than start')
        }

        if(title.trim().length < 2) {
            return setTitleValid(false)
        } else {
            setTitleValid(true)
        }

        //If id not exists we gonna create a new event
        if(!id){
            dispatch(eventStartAddNew(formValues))
        } else {
            dispatch(eventStartUpdateCurrent({
                ...formValues,
            }))
        }

        dispatch(uiCloseModal())
        dispatch(eventCleanCurrent())
        resetForm()
    }

    return (
        <Modal
            isOpen={modalOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={handleClose}
            style={modalStyles}
            closeTimeoutMS={200}
            className="modal w-11/12 md:w-4/12 p-4 bg-white rounded-md shadow-md z-10 min-w-1/2"
            overlayClassName="modal-background"
            ariaHideApp={!process.env.NODE_ENV === 'test'}
        >
        <h1 className="text-xl font-bold">{current ? 'Updating' : 'New'} Event</h1>
        <hr />
        <form onSubmit={handleSubmit}>

            <div className="font-semibold my-2">
                <label className="">Date and hour of start</label><br />
                <DateTimePicker 
                    onChange={handleStartDate} 
                    value={startDate} 
                    minDate={startDate}
                />
            </div>
            <div className="font-semibold my-2">
                <label className="">Date and hour of finish</label><br />
                <DateTimePicker 
                    onChange={handleEndDate} 
                    value={endDate} 
                    minDate={startDate}
                />
            </div>
            <hr />

            <div className="my-2">
                <label className="font-semibold">Title and notes</label><br />
                <input 
                    type="text" 
                    className={`input-primary ${!titleValid ? 'is-invalid' : ''}`}
                    placeholder="Title of event"
                    name="title"
                    autoComplete="off"
                    value={title}
                    onChange={setFormValue}
                /><br />
            </div>

            <textarea 
                type="text" 
                className="input-primary"
                placeholder="Notes"
                rows="5"
                name="notes"
                value={notes}
                onChange={setFormValue}
            ></textarea>

            <button
                type="submit"
                className="btn-primary w-full flex justify-center items-center gap-2"
            >
                <SaveIcon className="w-4 h-4"/>
                <span className="font-bold">Save</span>
            </button>
        </form>
    </Modal>
    )
}
