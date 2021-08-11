import './App.css';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import CounterContainer from "./containers/Counter/CounterContainer";
import BacklogContainer from "./containers/Backlog/BacklogContainer";
import EntityDetails from "./containers/EntityDetails/EntityDetails";
import LoginForm from "./containers/LoginForm/LoginForm";

function App() {
    return (
    <div className="App">
        <BrowserRouter>
            <Switch>
                <Route path="/login">
                    <LoginForm />
                </Route>
                <Route path="/counter">
                    <CounterContainer />
                </Route>
                <Route path="/backlog">
                    <BacklogContainer />
                </Route>
                <Route path="/browse/:id">
                    <EntityDetails />
                </Route>
                <Route>
                    <Redirect to="/login" />
                </Route>
            </Switch>
        </BrowserRouter>

    </div>
  );
}

export default App;
