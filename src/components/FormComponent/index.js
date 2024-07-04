import { React, useState, useContext } from "react";
import { Box, Typography, TextField, Select, MenuItem, InputLabel, Button, Alert } from "@mui/material";
import { useNavigate } from 'react-router-dom';

import { DataContext } from '../../context/DataContext';


import "./style.css"

function FormComponent() {

    const { userData, setUserData } = useContext(DataContext);
    const navigate = useNavigate();

    const [nome, setNome] = useState(userData.dados != null ? userData.dados.nome : "");
    const [cpf, setCpf] = useState(userData.dados != null ? userData.dados.cpf : "");
    const [cidade, setCidade] = useState(userData.dados != null ? userData.dados.cidade : "");
    const [email, setEmail] = useState(userData.dados != null ? userData.dados.email : "");
    const [telefone, setTelefone] = useState(userData.dados != null ? userData.dados.telefone : "");
    const [sexo, setSexo] = useState(userData.dados != null ? userData.dados.sexo : "");
    const [tamanhoCamisa, setTamanhoCamisa] = useState(userData.dados != null ? userData.dados.tamanhoCamisa : "");


    const handleSubmit = () => {

        if (userData.evento !== null &&
            nome !== "" &&
            cpf !== "" &&
            cidade !== "" &&
            email !== "" &&
            telefone !== "" &&
            sexo !== "" &&
            tamanhoCamisa !== "") {

            setUserData({
                evento: userData.evento,
                dados: {
                    "nome": nome,
                    "cpf": cpf,
                    "cidade": cidade,
                    "email": email,
                    "telefone": telefone,
                    "sexo": sexo,
                    "tamanhoCamisa": tamanhoCamisa
                },
                pagamento: userData.pagamento
            })
            navigate('/pagamento');

        } else {
            alert("Insira todos os valores corretamente")
        }
    }


    function formatDate(dateArray) {
        if (!Array.isArray(dateArray) || dateArray.length !== 3) {
            return 'Data não definida';
        }

        const [year, month, day] = dateArray;
        return `${day}/${month}/${year}`;
    };

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
        </Box>
    );

    return (

        <Box id="box_principal">
            {userData.evento === null && (
                <Alert severity="success">
                    Retorne a lista de eventos e escolha um evento!
                </Alert>
            )}
            {userData.evento !== null && (
                <Box id="box_centralizador">
                    <Box id="box_A" sx={{ marginBottom: "10px" }}>
                        <Typography variant="h5" sx={{ textAlign: "justify" }}>
                            Dados Pessoais
                        </Typography>
                        <Typography variant="body2" sx={{ textAlign: "justify" }}>
                            Tira o Typography e coloca o CardEvent
                        </Typography>
                        {/* <CardEvent key={item.id} item={item} /> */}
                    </Box>
                    <Box id="box_B">
                        <form style={{ width: "100%" }}>
                            <TextField
                                required
                                id="txNome"
                                fullWidth
                                variant="outlined"
                                label="Nome Completo"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            ></TextField>

                            <TextField
                                required
                                id="txCPF"
                                fullWidth
                                variant="outlined"
                                label="CPF"
                                value={cpf}
                                sx={{ marginTop: "10px" }}
                                onChange={(e) => setCpf(e.target.value)}
                            ></TextField>

                            <TextField
                                required
                                id="txCidade"
                                fullWidth
                                variant="outlined"
                                label="Cidade"
                                value={cidade}
                                sx={{ marginTop: "10px" }}
                                onChange={(e) => setCidade(e.target.value)}
                            ></TextField>

                            <TextField
                                required
                                id="txEmail"
                                type="email"
                                fullWidth
                                variant="outlined"
                                label="Email"
                                value={email}
                                sx={{ marginTop: "10px" }}
                                onChange={(e) => setEmail(e.target.value)}
                            ></TextField>

                            <TextField
                                required
                                id="txTelefone"
                                fullWidth
                                variant="outlined"
                                label="Telefone"
                                value={telefone}
                                sx={{ marginTop: "10px" }}
                                onChange={(e) => setTelefone(e.target.value)}
                            ></TextField>

                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                                justifyContent: "space-between",
                                marginTop: "10px"
                            }}>
                                <Box id="box_sexo" sx={{ width: "70%" }}>
                                    <InputLabel id="select-label-sexo">Sexo</InputLabel>
                                    <Select
                                        labelId="select-label-sexo"
                                        id="txSexo"
                                        value={sexo}
                                        label="Sexo"
                                        sx={{ width: "100%" }}
                                        onChange={(e) => setSexo(e.target.value)}
                                    >
                                        <MenuItem value="Masculino">Masculino</MenuItem>
                                        <MenuItem value="Feminimo">Feminimo</MenuItem>
                                    </Select>
                                </Box>

                                <Box>
                                    <InputLabel id="select-label-tamanho-camisa">Camisa</InputLabel>
                                    <Select
                                        labelId="select-label-tamanho-camisa"
                                        id="txTamanhoCamisa"
                                        value={tamanhoCamisa}
                                        label="Tamanho da Camisa"
                                        onChange={(e) => setTamanhoCamisa(e.target.value)}
                                    >
                                        <MenuItem value="P">P</MenuItem>
                                        <MenuItem value="M">M</MenuItem>
                                        <MenuItem value="G">G</MenuItem>
                                        <MenuItem value="GG">GG</MenuItem>
                                    </Select>
                                </Box>
                            </Box>
                        </form>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            marginTop: "20px",
                            width: "100%"
                        }}>
                            <Button
                                variant="contained"
                                className="enviar"
                                sx={{
                                    width: "30%",
                                    minWidth: "200px"
                                }}
                                onClick={() => handleSubmit()}
                            >
                                Ir para pagamento
                            </Button>
                        </Box>
                    </Box>
                </Box >
            )}
        </Box >
    );

};

export default FormComponent;




