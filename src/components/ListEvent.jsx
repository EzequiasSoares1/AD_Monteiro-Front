import axios from "axios";
import React, { useState, useEffect } from "react";
import "../styles/ListEvent.css"
import { Skeleton } from "@mui/material";

// convertendo data array USA para data brasileira

const formatDate = (dateArray) => {
    if (!Array.isArray(dateArray) || dateArray.length !== 3) {
      return 'Data não definida';
    }
  
    const [year, month, day] = dateArray;
    return `${day}/${month}/${year}`;
  };

  // card renderizado com informações da API
  
  const CardEvent = ({ item }) => (
    <div className="cardevento">
        {
            // conversão da IMG BASE64 para jpeg
        }
        <div className="imgcontainer">
            <img className="imagem" src={`data:image/jpeg;base64, ${item.linkImgLogo}`} alt="imagem do evento" />
        </div>

      <p className="valor">R$ {item.value}</p>

      <h1 className="eventname">{item.name}</h1>

      <p className="description">{item.description}</p>

      <p className="data">{formatDate(item.dateEvent)}</p>

      <div className="startend">
        <p className="inicio">{formatDate(item.startRegistration)}</p>
        <p>ATÉ</p>
        <p className="final">{formatDate(item.endRegistration)}</p>
      </div>
      <button className="enviar"  type="submit">Inscrever-se</button>
    </div>
  );  

  // função de busca e armazenamendo de dados da API
  
const ListEvent = () => {


    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect( () => {

        const apiResponse = async () => {
            try {
                const response = await axios.get('https://ad-monteiro-back.onrender.com/event');
                setData(response.data);
                setLoading(false);

            } catch (error) {
                setError(error);
                setLoading(false);

            }
        };

        apiResponse();

    }, []);

    
    return( 
      <div className="main">
        <div className="pagname">
            <h1>Eventos</h1>
        </div>
        <div className="listview">

            {loading ? <Skeleton width={288} height={350} /> : data.map((item) => (
                <CardEvent key={item.id} item={item} />
            ))}
        </div>
      </div>
    );
}





export default ListEvent;           