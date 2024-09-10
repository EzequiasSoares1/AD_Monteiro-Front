import React, { useState, useEffect, useContext } from "react";
import { Box, Skeleton, Typography } from "@mui/material";

import Api from "../../services/Api";
import CardEvent from "../CardEvent";
import { DataContext } from '../../context/DataContext';

import "./style.css"

const ListEvent = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userData, setUserData } = useContext(DataContext);

  useEffect(() => {

    const apiResponse = async () => {
      try {
        const response = await Api.getEventActive();
        setData(response.data);
        setLoading(false);

      } catch (error) {
        setError(error);
        setLoading(false);

      }
    };

    apiResponse();

    setUserData({
      evento: null,
      dados: null,
      pagamento: null
    })

  }, []);


  return (
    <Box className="main">
      <Box className="pagname">
        <Typography variant="h3">Eventos</Typography>
      </Box>
      <Box className="listview">

        {loading ? <Skeleton width={288} height={350} /> : data.map((item) => (
          <CardEvent key={item.id} item={item} tipo="LIST" />
        ))}
      </Box>
    </Box>
  );
}





export default ListEvent;           