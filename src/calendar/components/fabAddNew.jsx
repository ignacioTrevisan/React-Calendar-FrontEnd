import React from 'react'
import { UseCalendarStore, UseUiStore } from '../../hooks'
import { addHours } from 'date-fns';

export const FabAddNew = () => {

    const { openDateModal } = UseUiStore();
    const { setActiveEvent } = UseCalendarStore();
    const handleClickNew = () => {
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: '#fafafa',
            user: {
                _id: '',
                name: '',
            }
        })
        openDateModal();
    }
    return (
        <button className='btn btn-primary fab'
            aria-label='fabNew'
            onClick={handleClickNew}>

            <i className='fas fa-plus'></i>
        </button>
    )
}
