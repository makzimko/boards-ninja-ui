import './App.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import CounterContainer from "./containers/Counter/CounterContainer";

function App() {
    return (
    <div className="App">
        <BrowserRouter>
            <Switch>
                <Route path="/counter">
                    <CounterContainer />
                </Route>
                <Route>
                    <h1>Board ninja</h1>
                    coming soon...
                </Route>
            </Switch>
        </BrowserRouter>

    </div>
  );
}

export default App;
