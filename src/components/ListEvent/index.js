import React, { useState, useEffect } from "react";
import { Box, Skeleton, Typography, Button } from "@mui/material";

import axios from "axios";

import "./style.css"

// convertendo data array USA para data brasileira

function formatDate(dateArray) {
  if (!Array.isArray(dateArray) || dateArray.length !== 3) {
    return 'Data não definida';
  }

  const [year, month, day] = dateArray;
  return `${day}/${month}/${year}`;
};

// card renderizado com informações da API

const CardEvent = ({ item }) => (
  <Box className="cardevento">

    <Box className="imgcontainer">
      <img className="imagem" src={`data:image/jpeg;base64, ${item.linkImgLogo}`} alt="imagem do evento" />
    </Box>

    <Typography variant="body2" className="valor">R$ {item.value}</Typography>

    <Typography variant="h3" className="eventname">{item.name}</Typography>

    <Typography variant="body2" className="description">{item.description}</Typography>

    <Typography variant="body2" className="data">{formatDate(item.dateEvent)}</Typography>

    <Box className="startend">
      <Typography variant="body2" className="inicio">{formatDate(item.startRegistration)}</Typography>
      <Typography variant="body2">ATÉ</Typography>
      <Typography variant="body2" className="final">{formatDate(item.endRegistration)}</Typography>
    </Box>
    <Button
      variant="contained"
      className="enviar"
      sx={{
        marginBottom: '10px',
        marginTop: '10px'
      }}
      onClick={() => {
        alert('inscrever-se');
      }}
      type="submit"
    >
      Inscrever-se
    </Button>
  </Box>
);

// função de busca e armazenamendo de dados da API

const ListEvent = () => {


  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {

    const apiResponse = async () => {
      try {
        const response = await axios.get('https://ad-monteiro-back.onrender.com/event/active');
        setData(response.data);
        setLoading(false);

      } catch (error) {
        setError(error);
        setLoading(false);

      }
    };

    apiResponse();

  }, []);


  return (
    <Box className="main">
      <Box className="pagname">
        <Typography variant="h1">Eventos</Typography>
      </Box>
      <Box className="listview">

        {loading ? <Skeleton width={288} height={350} /> : data.map((item) => (
          <CardEvent key={item.id} item={item} />
        ))}
      </Box>
    </Box>
  );
}





export default ListEvent;           