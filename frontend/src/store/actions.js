import {BOOK_TOUR, CLOSE_FORM, SHOW_NOTIFY} from './constants';

export const setBookTour = (payload) =>({
    type: BOOK_TOUR,
    payload
})
export const setCloseForm = () =>({
    type: CLOSE_FORM,
})
export const setShowNofify = (payload) =>({
    type: SHOW_NOTIFY,
    payload
})