import React from "react";
import "../styles/NossaHistoria.css"
import Line from "../assets/line.svg"
import CardNs from "../assets/card-ns.png"

const NossaHistoria = () => {
    return(
        <div className="ns-section">
            <div className="ns-max-w">
                <div className="ns-title">
                    <h1>Nossa História</h1>
                </div>
                <div className="ns-contain">
             
                        <div className="image">
                            <img className="img-one" src={CardNs} alt="" />
                        </div>
               
                    <div className="text">
                        <h1>Texto Impactante</h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam facere porro repellendus deleniti error, voluptate repellat quae itaque sint optio, quis alias exercitationem ipsam enim illum ad. Explicabo, repudiandae ut.
                        </p>
                    </div>
                </div>
                <div className="ns-line">   
                    <img src={Line} alt="" />
                </div>
            </div>
        </div>
    );
};

export default NossaHistoria;