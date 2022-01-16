import {BOOK_TOUR, CLOSE_FORM, SHOW_NOTIFY, SEARCH, LOGIN, LOADING} from './constants'
const initialState = {
    tourID: 0,
    openForm: false,
    showNotify: false,
    search:'',
    role:'user',
    loading:false,
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
        case SEARCH:
            return {
                ...initialState,
                search: action.payload
            };    
        case LOGIN:
            return {
                ...initialState,
                role: action.payload
            };    
        case LOADING:
            return {
                ...initialState,
                loading: action.payload
            };    
        default:
            break;
    }
}

export {initialState};
export default reducer;