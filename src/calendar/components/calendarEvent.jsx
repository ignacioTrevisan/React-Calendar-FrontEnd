import React from 'react'

export const CalendarEvent = (props) => {
    const { title, user, notes } = props.event;

    return (
        <>
            <strong>{title}</strong>
            <div style={{ fontSize: '12px' }}>

                <p>{notes}</p>
                <p>- {user ? user.name : 'Usuario inexistente'}</p>
            </div>
        </>
    )
}
