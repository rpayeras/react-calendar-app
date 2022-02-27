import React, { useState } from 'react'
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {
    const [isOpen, setIsOpen] = useState(true)

    const handleClose = () => {
        console.log('...closing')
        setIsOpen(false)
    }

    return (
        <Modal
        isOpen={isOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={handleClose}
        style={customStyles}
        closeTimeoutMS={200}
        className="modal"
        overlayClassName="modal-fondo"
    >
        <h1>Modal test</h1>
        <hr />
        <span>FLipes</span>

    </Modal>
    )
}
