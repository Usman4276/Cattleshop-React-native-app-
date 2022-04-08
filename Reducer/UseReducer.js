export const initialState = null;
export const logoutInitialstate = null;
export const initialvalue = 0;
//Navbar true reducer
export const reducer = (state, action) => {

    if (action.type === 'customer') {
        return action.payload;
    }
    if (action.type === 'supplier') {
        return action.payload;
    }
    if (action.type === 'consultant') {
        return action.payload;
    }
    if (action.type === 'p&dservice') {
        return action.payload;
    }

    if (action.type === 'logout') {
        return action.payload;
    }


    return state;
}

//Login reducer (for getting required documents from DB)
export const lreducer = (state, action) => {

    if (action.type === 'customer') {
        return action.data;
    }
    if (action.type === 'supplier') {
        return action.data;
    }
    if (action.type === 'consultant') {
        return action.data;
    }
    if (action.type === 'p&dservice') {
        return action.data;
    }

    return state;
}

//Type reducer
export const treducer = (state, action) => {

    if (action.type === 'customer') {
        return action.payload;
    }
    if (action.type === 'supplier') {
        return action.payload;
    }
    if (action.type === 'consultant') {
        return action.payload;
    }
    if (action.type === 'pick_&_drop_service') {
        return action.payload;
    }


    return state;
}

//For checking if user logout or not on refresh page
export const logoutreducer = (state, action) => {
    if (action.logout === 'true') {
        return action.logout;
    }
    return state;
}

//For Transfering CattleId to CattleDetails component
export const CattleIdreducer = (state, action) => {
    if (action.type != null) {
        return action.type;
    }
    return state;
}

//For transfering Consultant fee to ProceedToPay component
export const ConsultantFeereducer = (state, action) => {
    if (action.payload != null) {
        return action.payload;
    }
    return state;
}

//For transfering Pick Drop fee to ProceedToPay component
export const PickDropFeereducer = (state, action) => {
    if (action.payload != null) {
        return action.payload;
    }
    return state;
}

export const CustomerIdreducer = (state, action) => {
    if (action.payload != null) {
        console.log(action.payload);
        return action.payload;
    }

    return state;
}

export const ConsultantIdreducer = (state, action) => {
    if (action.payload != null) {
        console.log(action.payload);
        return action.payload;
    }

    return state;
}

export const PickDropEmailreducer = (state, action) => {
    if (action.payload != null) {
        console.log(action.payload);
        return action.payload;
    }

    return state;
}

export const AddToCartStatusreducer = (state, action) => {
    if (action.payload != null) {
        console.log(action.payload);
        return action.payload;
    }

    return state;
}

export const AdminDashboardValidationReducer = (state, action) => {
    if (action.payload != null) {
        console.log(action.payload);
        return action.payload;
    }

    return state;
}

