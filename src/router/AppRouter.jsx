import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from '../pages/Home';
import EventList from '../pages/EventList';
import PaymentMethod from '../pages/PaymentMethod';
import Inscription from "../pages/Inscription"

const AppRouter = () => {
    return(
        <Router>
            <Routes>
                <Route exact path="/inicio" Component={Home} />
                <Route path="/eventos" Component={EventList}/>
                <Route path="/pagamento" Component={PaymentMethod} />
                <Route path="/inscricao" Component={Inscription} />
            </Routes>
        </Router>
    );
};

export default AppRouter;