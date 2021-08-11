import CounterProvider, {CounterContext} from "../../providers/Counter";
import Counter from "../../components/Counter/Counter";

const CounterContainer = () => {
    return <CounterProvider>
        <CounterContext.Consumer>
            {([value, {increment, decrement, reset}]) =>
                <Counter value={value}
                         increment={increment}
                         decrement={decrement}
                         reset={reset}
                />
            }
        </CounterContext.Consumer>
    </CounterProvider>
};

export default CounterContainer;