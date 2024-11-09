import { React, useState, useContext, useEffect } from "react";
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
    IconButton,
    FormControl,
    FormHelperText,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

import { useNavigate } from 'react-router-dom';

import { DataContext } from '../../context/DataContext';
import CardEvent from "../CardEvent";
import PaymentBrick from "../PaymentBrick";
import PaymentPix from "../PaymentPix";
import InputMask from "react-input-mask";


import "./style.css"

function FormComponent() {

    const { userData, setUserData } = useContext(DataContext);
    const navigate = useNavigate();

    const [nome, setNome] = useState(userData.dados != null ? userData.dados.nome : "");
    const [telefoneEmergencia, setTelefoneEmergencia] = useState(userData.dados != null ? userData.dados.telefoneEmergencia : "");
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
    const [emailError, setEmailError] = useState(false);
    const [telefoneError, setTelefoneError] = useState(false);
    const [telefoneEmergenciaError, setTelefoneEmergenciaError] = useState(false);
    const [cidadeError, setCidadeError] = useState(false);

    // Função de validação de cidade (exemplo simples)
    const handleCityBlur = () => {
    if (cidade.trim() === '') {
        setCidadeError(true); // Marca erro se o campo estiver vazio
    } else {
        setCidadeError(false); // Caso contrário, limpa o erro
    }
    };

    const handleClickSnackBar = (mensagem) => {
        setMensagemSnackBar(mensagem)
        setOpenSnackBar(true);
    };

    const cidadesCaririOriental = [
        "Alcantil", "Amparo", "Assunção", "Barra de Santana", "Barra de São Miguel", "Boa Vista", 
        "Boqueirão", "Cabaceiras", "Camalaú", "Caraúbas", "Caturité", "Congo", "Coxixola", 
        "Gurjão", "Juazeirinho", "Livramento", "Monteiro", "Ouro Velho", "Parari", "Prata", 
        "Riacho de Santo Antônio", "Salgadinho", "Santo André", "São Domingos do Cariri", 
        "São João do Cariri", "São João do Tigre", "São José dos Cordeiros", 
        "São Sebastião do Umbuzeiro", "Serra Branca", "Soledade", "Sumé", "Taperoá", "Zabelê"
      ];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    };
    const telefoneMask = "(99) 99999-9999"; 

    const handleCloseDialog = () => {
        setOpenDialog(false);
        if (formaPagamento === "pix") {
            navigate("/eventos")
        }
    };
    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };
    
    const handleEmailBlur = () => {
        if (email && !validateEmail(email)) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
    };
    const validatePhone = (phone) => {
        const regex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
        return regex.test(phone);
    };

    const handlePhoneBlur = (type) => {
        // Validate the phone based on the type (either 'telefone' or 'telefoneEmergencia')
        if (type === 'telefone') {
            if (telefone && !validatePhone(telefone)) {
                setTelefoneError(true);
            } else {
                setTelefoneError(false);
            }
        } else if (type === 'telefoneEmergencia') {
            if (telefoneEmergencia && !validatePhone(telefoneEmergencia)) {
                setTelefoneEmergenciaError(true);
            } else {
                setTelefoneEmergenciaError(false);
            }
        }
    };
    const handleOpenDialog = () => {

        if (userData.evento !== null &&
            nome !== "" &&
            telefoneEmergencia !== "" &&
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
                            Dados de Inscrição
                        </Typography>
                        <CardEvent item={userData.evento} tipo="INSCRIPTION" />
                    </Box>
                    <Box id="id-box-form" sx={{ width: { xs: "100%", md: "58%" }, textAlign: { md: "justify" } }}>
                        <form style={{ width: "100%" }}>
                            <TextField required id="txNome" fullWidth variant="outlined" label="Nome Completo" value={nome} onChange={(e) => setNome(e.target.value)} />
                            
                            <TextField
                            required
                            id="txTelefone"
                            fullWidth
                            variant="outlined"
                            label="Telefone"
                            value={telefone}
                            sx={{ marginTop: "10px" }}
                            onChange={(e) => setTelefone(e.target.value)}
                            onBlur={() => handlePhoneBlur('telefone')}  // Validate only the telefone field
                            error={telefoneError}  // Display error for telefone if invalid
                            helperText={telefoneError ? "Telefone inválido" : ""}  // Show error message
                            InputProps={{
                                inputComponent: InputMask,  // Apply mask to the field
                                inputProps: { mask: telefoneMask }  // Define mask
                            }}
                        />

                            <FormControl fullWidth sx={{ marginTop: '10px' }} error={cidadeError}>
                                <InputLabel id="txCidade-label">Cidade</InputLabel>
                                <Select
                                    labelId="txCidade-label"
                                    id="txCidade"
                                    value={cidade}
                                    label="Cidade"
                                    onChange={(e) => setCidade(e.target.value)}
                                    onBlur={() => handleCityBlur()} // Validação ao sair do campo
                                >
                                    <MenuItem value="">Selecione a cidade</MenuItem>
                                    {cidadesCaririOriental.map((cidadeNome, index) => (
                                    <MenuItem key={index} value={cidadeNome}>{cidadeNome}</MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{cidadeError ? "Por favor, selecione uma cidade válida" : ""}</FormHelperText>
                            </FormControl>
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
                                onBlur={handleEmailBlur} // Validação ao sair do campo
                                error={emailError} // Mostra erro se inválido
                                helperText={emailError ? "Email inválido" : ""} // Mensagem de erro
                            ></TextField>
                          <TextField
                            required
                            id="txTelefoneEmergencia"
                            fullWidth
                            variant="outlined"
                            label="Telefone de Emergência"
                            value={telefoneEmergencia}
                            sx={{ marginTop: "10px" }}
                            onChange={(e) => setTelefoneEmergencia(e.target.value)}
                            onBlur={() => handlePhoneBlur('telefoneEmergencia')}  // Validate only the telefoneEmergencia field
                            error={telefoneEmergenciaError}  // Display error for telefoneEmergencia if invalid
                            helperText={telefoneEmergenciaError ? "Telefone de emergência inválido" : ""}  // Show error message
                            InputProps={{
                                inputComponent: InputMask,  // Apply mask to the field
                                inputProps: { mask: telefoneMask }  // Define mask
                            }}
                        />
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
                                        <MenuItem value="MASCULINO">Masculino</MenuItem>
                                        <MenuItem value="FEMININO">Feminino</MenuItem>
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
                            <IconButton
                                aria-label="close"
                                onClick={handleCloseDialog}
                                sx={{
                                    position: 'absolute',
                                    right: 8,
                                    top: 8,
                                    color: (theme) => theme.palette.grey[500],
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
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
                                    telefoneEmergencia={telefoneEmergencia}
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
                                    telefoneEmergencia={telefoneEmergencia}
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




