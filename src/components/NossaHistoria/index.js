import React from "react";
import { Box, Typography } from "@mui/material";

// import Line from "../../assets/line.svg"
import ImagemHistoria from "../../assets/imagem.png"

import "./style.css"

function NossaHistoria() {
    return (

        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ padding: { xs: 2, md: 4 } }}
        >
            <Box
                display="flex"
                flexDirection={{ xs: "column-reverse", md: "row" }}
                alignItems="center"
                justifyContent="space-between"
                sx={{ maxWidth: 1400, width: "100%" }}
            >

                <Box
                    sx={{
                        // textAlign: "center",
                        mb: { xs: 2, md: 0 },
                        minWidth: '50%',
                        height: { xs: 200, sm: 300, md: 500, lg: 500 }, // Definindo a altura da Box, pode ajustar conforme necessário
                        backgroundImage: `url(${ImagemHistoria})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                    }}
                />

                <Box className="text" sx={{ ml: { md: 3 }, textAlign: { xs: "center", md: "left" } }} >
                    <Typography variant="h4" className="texto-historia-principal" sx={{ mb: 2, mt: 2 }}>
                        Nossa História
                    </Typography>
                    <Typography variant="body1" align="justify" className="texto-historia" sx={{ mt: 2 }}>
                        Atualmente, a Igreja Evangélica Assembleia de Deus em Monteiro é pastoreada pelo Pr. Oziel Câncio. Com um templo moderno e amplo, é uma das maiores e mais influente congregação pentecostal do município.
                        Está localizado no centro da cidade, a igreja realiza cultos diários e diversos eventos evangelísticos, alcançando vidas com a mensagem do Evangelho.
                    </Typography>

                    <Typography variant="body1" align="justify" className="texto-historia" sx={{ mt: 2 }}>
                        Ao longo de sua história, a igreja se destacou por sua ação social, promovendo projetos de assistência social que beneficiam famílias carentes, comunidades em situação de vulnerabilidade social. A igreja também mantém um trabalho ativo de Escola Bíblica Dominical (EBD) com crianças, jovens e adultos, oferecendo atividades educativas, culturais e espirituais que contribuem para a sua formação integral à luz das sagradas escrituras.
                        A nossa igreja possui um legado marcante na história da cidade.
                    </Typography>

                    <Typography variant="body1" align="justify" className="texto-historia" sx={{ mt: 2 }}>
                        Sua presença contribuiu para a transformação da vida de muitas pessoas, levando esperança, conforto e salvação aos corações aflitos. A igreja também desempenha um papel fundamental na comunidade, promovendo valores como a caridade e a solidariedade ao próximo.
                        Além disso, a nossa história é exemplo inspirador de fé, perseverança e compromisso com a propagação do Evangelho. Uma jornada de peregrinação que se entrelaça com a própria história da cidade, marcada por momentos de desafios e conquistas, sempre com a certeza de que a mensagem de Deus é poderosa para transformar vidas e salvar almas
                    </Typography>

                    <Typography variant="body1" align="justify" className="texto-historia" sx={{ mt: 2, mb: 3 }}>
                        A nossa igreja possui um legado marcante na história da cidade. Sua presença contribuiu para a transformação da vida de muitas pessoas, levando esperança, conforto e salvação aos corações aflitos. A igreja também desempenha um papel fundamental na comunidade, promovendo valores como a caridade e a solidariedade ao próximo. Além disso, a nossa história é
                        exemplo inspirador de fé, perseverança e compromisso com a propagação do Evangelho. Uma jornada de peregrinação que se entrelaça com a própria história da cidade, marcada por momentos de desafios e conquistas, sempre com a certeza de que a mensagem de Deus é poderosa para transformar vidas e salvar almas.
                    </Typography>
                </Box>
            </Box>
            {/* <Box className="ns-line" sx={{ mt: 4, width: "100%", textAlign: "center", backgroundColor: 'blue' }}>
                <img src={Line} alt="" className="ns-line-color" />
            </Box> */}
        </Box>

    );
};

export default NossaHistoria;