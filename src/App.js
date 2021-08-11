import './App.css';
import {useReducer} from "react";

import counterReducer, { increment, decrement, setValue } from './store/counter'

function App() {
  const [state, dispatch] = useReducer(counterReducer, 0);

  return (
    <div className="App">
      <h1>{state}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(setValue(0))}>Reset</button>
    </div>
  );
}

export default App;
