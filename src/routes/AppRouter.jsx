import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import StoreProvider from "../store/StoreProvider";
import RoutesPrivate from "./RoutesPrivate"

import Home from '../pages/Home';
import EventList from '../pages/EventList';
import Inscription from "../pages/Inscription"
import Login from "../pages/Login";
import Report from "../pages/Report";

const AppRouter = () => {
    return (
        <Router>
            <StoreProvider>
                <Routes>
                    <Route path="/login" Component={Login} />
                    <Route exact path="/inicio" Component={Home} />
                    <Route path="/eventos" Component={EventList} />
                    <Route path="/inscricao" Component={Inscription} />
                    <Route
                        path="/relatorio"
                        element={
                            <RoutesPrivate>
                                <Report />
                            </RoutesPrivate>
                        }
                    />
                </Routes>
            </StoreProvider>
        </Router>
    );
};

export default AppRouter;