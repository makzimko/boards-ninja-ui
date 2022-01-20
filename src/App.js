import {useContext, useEffect} from "react";
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import './App.css';
import './utils/request';
import CounterContainer from "./containers/Counter/CounterContainer";
import BacklogContainer from "./containers/Backlog/BacklogContainer";
import EntityDetails from "./containers/EntityDetails/EntityDetails";
import LoginForm from "./containers/LoginForm/LoginForm";
import AuthContext from "./providers/Auth/context";
import Loader from './components/Loader/Loader'
import MainPageContainer from "./containers/MainPage/MainPageContainer";
import ArchiveContainer from "./containers/Archive/ArchiveContiner";
import DefaultLayout from "./components/DefaulsLayout/DefaultLayout";
import Test from "./containers/Test/Test";

import useAuthActions, { authLoadingState } from "./atoms/auth";
import {useRecoilValue} from "recoil";
import {LOADING} from "./atoms/loading/loading";

const App = () => {
    const isPerformed = useRecoilValue(authLoadingState);
    const { getUserInfo } = useAuthActions();

    useEffect(async () => {
        await getUserInfo();
    }, []);

    return [LOADING.SUCCESS, LOADING.ERROR].includes(isPerformed) ? <BrowserRouter>
        <DefaultLayout>
            <Switch>
                <Route path="/login">
                    <LoginForm/>
                </Route>
                <Route path="/counter">
                    <CounterContainer/>
                </Route>
                <Route path="/backlog">
                    <BacklogContainer/>
                </Route>
                <Route path="/archive">
                    <ArchiveContainer/>
                </Route>
                <Route path="/browse/:id">
                    <EntityDetails/>
                </Route>
                <Route path="/test">
                    <Test/>
                </Route>
                <Route>
                    <MainPageContainer/>
                </Route>
            </Switch>
        </DefaultLayout>
    </BrowserRouter> : <Loader />
}

export default App;
