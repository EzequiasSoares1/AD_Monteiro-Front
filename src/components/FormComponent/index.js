import { React, useState, useContext } from "react";
import {
    Box,
    Typography,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    Button,
    Alert,
    Dialog,
    DialogContent,
    DialogTitle,
    Snackbar,
    IconButton
} from "@mui/material";
import { useNavigate } from 'react-router-dom';

import { DataContext } from '../../context/DataContext';
import PaymentBrick from "../PaymentBrick";
import PaymentPix from "../PaymentPix";

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
    const [formaPagamento, setFormaPagamento] = useState(userData.dados != null ? userData.dados.formaPagamento : "");

    const [openDialog, setOpenDialog] = useState(false);
    const [scroll, setScroll] = useState('paper');
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [mensagemSnackBar, setMensagemSnackBar] = useState(null);

    const handleClickSnackBar = (mensagem) => {
        setMensagemSnackBar(mensagem)
        setOpenSnackBar(true);
    };

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        if (formaPagamento === "pix") {
            navigate("/eventos")
        }
    };

    const handleOpenDialog = () => {

        if (userData.evento !== null &&
            nome !== "" &&
            cpf !== "" &&
            cidade !== "" &&
            email !== "" &&
            telefone !== "" &&
            sexo !== "" &&
            tamanhoCamisa !== "" &&
            formaPagamento !== "") {

            setOpenDialog(true)

        } else {
            handleClickSnackBar("Insira todos os valores corretamente");
        }
    };

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

            <Typography variant="body1" className="eventname">{item.name}</Typography>

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

        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: userData.evento === null ? "center" : "flex-start",
                minHeight: "100vh",
                width: "100%",
            }}
        >
            {userData.evento === null && (
                <Alert severity="success">
                    Retorne a lista de eventos e escolha um evento!
                </Alert>
            )}
            {userData.evento !== null && (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" }, // Ajuste responsivo aqui
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        width: "90%",
                        marginTop: "100px"
                    }}
                >
                    <Box
                        id="id-box-card"
                        sx={{
                            width: { xs: "100%", md: "38%" }, // Largura responsiva
                            marginBottom: { xs: "20px", md: "0" }, // Espaçamento quando empilhado
                            display: "flex", // Adiciona display flex
                            flexDirection: "column", // Coloca os itens em coluna
                            alignItems: "center", // Centraliza os itens horizontalmente
                            textAlign: "center" // Centraliza o texto dentro dos itens
                        }}
                    >
                        <Typography variant="h5" sx={{ marginBottom: "20px" }}>
                            Dados Inscrição
                        </Typography>
                        <CardEvent item={userData.evento} />
                    </Box>
                    <Box
                        id="id-box-form"
                        sx={{
                            width: { xs: "100%", md: "58%" }, // Largura responsiva
                            textAlign: { md: "justify" }
                        }}
                    >
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
                                <Box
                                    sx={{
                                        width: { xs: "100%", sm: "30%" },
                                        marginBottom: { xs: "10px", sm: "0" },
                                    }}
                                >
                                    <InputLabel id="select-label-sexo">Sexo</InputLabel>
                                    <Select
                                        labelId="select-label-sexo"
                                        id="txSexo"
                                        value={sexo}
                                        label="Sexo"
                                        sx={{ width: "100%" }}
                                        onChange={(e) => setSexo(e.target.value)}
                                    >
                                        <MenuItem value="MALE">Masculino</MenuItem>
                                        <MenuItem value="FEMALE">Feminino</MenuItem>
                                    </Select>
                                </Box>

                                <Box
                                    sx={{
                                        width: { xs: "100%", sm: "30%" },
                                        marginBottom: { xs: "10px", sm: "0" }
                                    }}
                                >
                                    <InputLabel id="select-label-tamanho-camisa">Camisa</InputLabel>
                                    <Select
                                        labelId="select-label-tamanho-camisa"
                                        id="txTamanhoCamisa"
                                        value={tamanhoCamisa}
                                        label="Tamanho da Camisa"
                                        sx={{ width: "100%" }}
                                        onChange={(e) => setTamanhoCamisa(e.target.value)}
                                    >
                                        <MenuItem value="P">PP</MenuItem>
                                        <MenuItem value="P">P</MenuItem>
                                        <MenuItem value="M">M</MenuItem>
                                        <MenuItem value="G">G</MenuItem>
                                        <MenuItem value="GG">GG</MenuItem>
                                    </Select>
                                </Box>
                                <Box
                                    sx={{
                                        width: { xs: "100%", sm: "30%" }
                                    }}
                                >
                                    <InputLabel id="select-label-forma-pagamento">Forma Pagamento</InputLabel>
                                    <Select
                                        labelId="select-label-forma-pagamento"
                                        id="txFormaPagamento"
                                        value={formaPagamento}
                                        label="Forma Pagamento"
                                        sx={{ width: "100%" }}
                                        onChange={(e) => setFormaPagamento(e.target.value)}
                                    >
                                        <MenuItem value="pix">PIX</MenuItem>
                                        <MenuItem value="cartao">Cartão</MenuItem>
                                    </Select>
                                </Box>

                            </Box>
                        </form>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column-reverse", md: "row" }, // Ajuste responsivo aqui
                                justifyContent: "flex-end",
                                marginTop: "20px",
                                width: "100%",
                                alignItems: { xs: "center", md: "justify" }
                            }}
                        >
                            <Button
                                variant="contained"
                                className="cancelar-voltar"
                                sx={{
                                    width: "25%",
                                    minWidth: "150px",
                                    margin: "10px"
                                }}
                                onClick={() => navigate('/eventos')}
                            >
                                Cancelar
                            </Button>

                            <Button
                                variant="contained"
                                className="enviar"
                                sx={{
                                    width: "25%",
                                    minWidth: "200px"
                                }}
                                onClick={() => { handleOpenDialog() }}
                            >
                                Ir para pagamento
                            </Button>
                        </Box>
                    </Box>
                    <Dialog
                        open={openDialog}
                        onClose={(event, reason) => {
                            if (reason !== 'backdropClick') {
                                handleCloseDialog();
                            }
                        }}
                        scroll={scroll}
                        aria-labelledby="scroll-dialog-title"
                        aria-describedby="scroll-dialog-description"
                    >
                        <DialogTitle id="scroll-dialog-title">
                            Pagamento
                        </DialogTitle>
                        <DialogContent dividers={scroll === 'paper'}>
                            {formaPagamento === "pix" && (
                                <PaymentPix
                                    idEvento={userData.evento.id}
                                    nome={nome}
                                    telefone={telefone}
                                    cidade={cidade}
                                    email={email}
                                    sexo={sexo}
                                    tamanho={tamanhoCamisa}
                                />
                            )}
                            {formaPagamento === "cartao" && (
                                <PaymentBrick
                                    evento={userData.evento}
                                    nome={nome}
                                    telefone={telefone}
                                    cidade={cidade}
                                    email={email}
                                    sexo={sexo}
                                    tamanho={tamanhoCamisa}
                                />
                            )}
                        </DialogContent>
                    </Dialog>
                    <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        open={openSnackBar}
                        autoHideDuration={5000}
                        onClose={handleCloseSnackBar}
                    >
                        <Alert severity="error">
                            {mensagemSnackBar}
                        </Alert>
                    </Snackbar>
                </Box >
            )}
        </Box >
    );

};

export default FormComponent;




