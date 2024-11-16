import React, { useState, useEffect, useContext } from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import Api from "../../services/Api";
import CardEvent from "../CardEvent";
import { DataContext } from '../../context/DataContext';
import StoreContext from "../../store/StoreContext";
import "./style.css";

const ListEvent = () => {
  const [data, setData] = useState([]); // Inicializando como array vazio
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userData, setUserData } = useContext(DataContext);
  const { token } = useContext(StoreContext);

  useEffect(() => {
    const apiResponse = async () => {
      try {
        const response = await (token === null ? Api.getEventActive() : Api.getAllEvent(token));
        setData(response.data || []); // Garantindo que data seja um array
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
    });
  }, [token, setUserData]);

  return (
    <Box className="main">
      <Box className="pagname">
        <Typography variant="h3">Eventos</Typography>
      </Box>
      <Box className="listview">
        {loading ? (
          <Skeleton width={288} height={350} />
        ) : (
          Array.isArray(data) && data.map((item) => (
            <CardEvent key={item.id} item={item} tipo="LIST" />
          ))
        )}
      </Box>
    </Box>
  );
};

export default ListEvent;
