import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ListEvent from "../../components/ListEvent";


function EventList() {
    return (
        <div>
            <Header />
            <ListEvent />
            <Footer />
        </div>
    );
};

export default EventList