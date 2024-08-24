import { parseISO } from "date-fns"
import { isValid } from "date-fns/isValid";

const isISODateString = (str) => {
    const isoDateRegex = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|([+-]\d{2}:\d{2}))?)$/;
    return isoDateRegex.test(str);
};

export const ConvertEventsToDateEvents = (eventos = []) => {
    return eventos.map(event => {
        let start = event.start;
        let end = event.end;

        // Verifica y convierte fechas en formato ISO, si no están en formato ISO se mantienen como están
        if (typeof start === 'string' && isISODateString(start)) {
            start = parseISO(start);
        }

        if (typeof end === 'string' && isISODateString(end)) {
            end = parseISO(end);
        }

        // También podrías considerar validar la fecha resultante, si quieres asegurarte de que es válida
        if (!isValid(start)) {
            console.error(`Fecha de inicio no válida: ${event.start}`);
        }

        if (!isValid(end)) {
            console.error(`Fecha de fin no válida: ${event.end}`);
        }

        return { ...event, start, end };
    });
};