import {BOOK_TOUR, CLOSE_FORM} from './constants'
const initialState = {
    tourID: 0,
    openForm: false,
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
        default:
            break;
    }
}

export {initialState};
export default reducer;