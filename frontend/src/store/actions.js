import {BOOK_TOUR, CLOSE_FORM, SHOW_NOTIFY, SEARCH, LOGIN, LOADING} from './constants';

export const setBookTour = (payload) =>({
    type: BOOK_TOUR,
    payload
});
export const setCloseForm = () =>({
    type: CLOSE_FORM,
});
export const setShowNofify = (payload) =>({
    type: SHOW_NOTIFY,
    payload
});
export const setSearch = (payload) =>({
    type: SEARCH,
    payload
});
export const setLogin = (payload) =>({
    type: LOGIN,
    payload
});
export const setLoading = (payload) =>({
    type: LOADING,
    payload
});