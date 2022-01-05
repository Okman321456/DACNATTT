import {BOOK_TOUR, CLOSE_FORM} from './constants';

export const setBookTour = (payload) =>({
    type: BOOK_TOUR,
    payload
})
export const setCloseForm = () =>({
    type: CLOSE_FORM,
})