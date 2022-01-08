import {BOOK_TOUR, CLOSE_FORM, SHOW_NOTIFY} from './constants'
const initialState = {
    tourID: 0,
    openForm: false,
    showNotify: false,
}

function reducer(state, action){
    switch (action.type) {
        case BOOK_TOUR:
            return {
                openForm: true,
                tourID:action.payload
            };    
        case CLOSE_FORM:
            return {
                openForm: false,
                tourID: 0
            };    
        case SHOW_NOTIFY:
            return {
                ...initialState,
                showNotify: action.payload
            };    
        default:
            break;
    }
}

export {initialState};
export default reducer;