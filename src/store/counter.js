const INCREMENT = 'counter/increment';
const DECREMENT = 'counter/decrement';
const SET_VALUE = 'counter/setValue';

const counterReducer = (state = 0, action) => {
    switch (action.type) {
        case INCREMENT:
            return state + 1;
        case DECREMENT:
            return state - 1;
        case SET_VALUE:
            return action.payload;
        default:
            return state;
    }
};

export const increment = () => ({
    type: INCREMENT
});

export const decrement = () => ({
    type: DECREMENT
});

export const setValue = (value) => ({
   type: SET_VALUE,
   payload: value
});

export default counterReducer;