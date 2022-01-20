import {BOOK_TOUR, CLOSE_FORM, SHOW_NOTIFY, SEARCH, LOGIN, LOADING} from './constants'
const initialState = {
    tourInfo:{
        id: 0,
        name:'',
        price: 0,
        discount:0,
    },
    openForm: false,
    showNotify: false,
    search:'',
    account: {
        role:'user',
        name:'',
    },
    loading:false,
}

function reducer(state, action){
    switch (action.type) {
        case BOOK_TOUR:
            return {
                ...initialState,
                openForm: true,
                tourInfo:action.payload
            };    
        case CLOSE_FORM:
            return {
                ...initialState,
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
                account: action.payload
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