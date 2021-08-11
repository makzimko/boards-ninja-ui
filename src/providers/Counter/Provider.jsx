import {useMemo, useReducer} from "react";

import CounterContext from "./context";
import counterReducer, {decrement, increment, setValue} from "./reducer";

const CounterProvider = ({ children }) => {
    const [state, dispatch] = useReducer(counterReducer, 0);

    const methods = useMemo(() => ({
        increment: () => dispatch(increment()),
        decrement: () => dispatch(decrement()),
        reset: () => dispatch(setValue(0))

    }), []);

    const contextValue = useMemo(() => {
        return [state, methods]
    }, [state, methods]);

    return <CounterContext.Provider value={contextValue}>
        {children}
    </CounterContext.Provider>
};

export default CounterProvider;