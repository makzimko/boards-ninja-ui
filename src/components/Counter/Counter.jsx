const Counter = ({ value, increment, decrement, reset }) => {
    return <>
        <h1>Counter</h1>
        <h2>State: {value}</h2>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={reset}>Reset</button>
    </>;
};

export default Counter;