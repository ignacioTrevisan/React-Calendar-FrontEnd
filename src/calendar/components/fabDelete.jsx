import React from 'react'
import { UseCalendarStore } from '../../hooks'

export const FabDelete = () => {
    const { startDeletingEvent } = UseCalendarStore();
    const handleDeleteClick = () => {
        startDeletingEvent();
    }
    return (
        <button className='btn btn-danger del'
            onClick={handleDeleteClick}>

            <i className='fa fa-trash'></i>
        </button>
    )
}
