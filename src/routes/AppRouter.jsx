import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from '../pages/Home';
import EventList from '../pages/EventList';
import Inscription from "../pages/Inscription"
import Login from "../pages/Login";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/inicio" Component={Home} />
                <Route path="/eventos" Component={EventList} />
                <Route path="/inscricao" Component={Inscription} />
                <Route path="/login" Component={Login} />
            </Routes>
        </Router>
    );
};

export default AppRouter;