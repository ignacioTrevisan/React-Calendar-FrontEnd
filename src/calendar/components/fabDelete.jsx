import React from 'react'
import { UseCalendarStore } from '../../hooks'

export const FabDelete = () => {
    const { startDeletingEvent, hasEventSelected } = UseCalendarStore();
    const handleDeleteClick = () => {
        startDeletingEvent();
    }
    return (
        <button className='btn btn-danger del'
            aria-label='btn-delete'
            style={{ display: `${hasEventSelected === true ? '' : 'none'}` }}
            onClick={handleDeleteClick}>

            <i className='fa fa-trash'></i>
        </button>
    )
}
