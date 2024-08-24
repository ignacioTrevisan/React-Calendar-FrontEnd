import Modal from 'react-modal';
import React, { useEffect, useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';
import DatePicker, { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
import Swal from 'sweetalert2';
import { UseUiStore } from '../../hooks/useUiStore';
import { UseCalendarStore } from '../../hooks';
import zIndex from '@mui/material/styles/zIndex';
import { isValid } from 'date-fns/isValid';

if (process.env.NODE_ENV !== 'test') {
    //por alguna razon en testing al importar .css me tira error de sintaxis
    //asi que esta es una solucion parcial
    import('./modal.css');
    import('react-datepicker/dist/react-datepicker.css');
}

registerLocale('es', es)


export const CalendarModal = () => {

    const { isDateModalOpen, closeDateModal } = UseUiStore();
    const { startSavingEvent, startLoadingEvents, activeEvent } = UseCalendarStore();
    const [formSubmitted, setFormSubmitted] = useState(false);



    useEffect(() => {
        startLoadingEvents();
    }, [])


    useEffect(() => {
        if (activeEvent && isValid(activeEvent.start) && isValid(activeEvent.end)) {
            setFormValue(activeEvent);
        } else {
            setFormValue({
                title: '',
                notes: '',
                start: new Date(),
                end: addHours(new Date(), 2),
                bgColor: '#fafafa',
                user: {
                    _id: '',
                    name: '',
                }
            });
        }
    }, [activeEvent]);


    const [formValue, setFormValue] = useState({
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

    const onInputChange = ({ target }) => {
        setFormValue(
            {
                ...formValue, [target.name]: target.value
            }
        )
    }

    const onDateChange = (event, texto) => {
        setFormValue(
            {
                ...formValue, [texto]: event
            }
        )

    }




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
    const onCloseModal = () => {

        closeDateModal();
    }

    const submit = (event) => {
        setFormSubmitted(true);
        event.preventDefault();
        const diference = differenceInSeconds(formValue.end, formValue.start);

        if (isNaN(diference) || diference <= 0) {
            Swal.fire({
                title: 'Error!',
                text: 'Por favor asegurese de ingresar fechas validas',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
            return;
        }

        startSavingEvent(formValue);
        onCloseModal();
        setFormSubmitted(false);


    }

    const error = useMemo(() => {
        if (formValue?.title.length < 1 && formSubmitted) {
            return true;
        } else {
            return false;
        }
    }, [formValue?.title, formSubmitted])


    if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root');

    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            overlayClassName={'modal-fondo'}
            closeTimeoutMS={500}
        >

            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={submit}>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>

                </div>
                <DatePicker
                    selected={formValue?.start}
                    name='start'
                    className='form-control'
                    onChange={(event) => onDateChange(event, 'start')}
                    dateFormat={'Pp'}
                    showTimeSelect
                    locale='es'
                    timeCaption='Hora'


                />
                <div className="form-group mb-2 " >
                    <label>Fecha y hora fin</label>

                </div>
                <DatePicker
                    selected={formValue?.end}
                    name='end'
                    className='form-control'
                    onChange={(event) => onDateChange(event, 'end')}
                    minDate={formValue?.start}
                    dateFormat={'Pp'}
                    showTimeSelect
                    locale='es'
                    timeCaption='Hora'

                />
                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${error ? 'is-invalid' : ''}`}

                        placeholder="Título del evento"
                        value={formValue?.title}
                        onChange={onInputChange}
                        name="title"
                        autoComplete="off"

                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        value={formValue?.notes}
                        onChange={onInputChange}
                        rows="5"
                        name="notes"
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"

                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>

    )
}
