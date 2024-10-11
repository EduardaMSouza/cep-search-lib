"use client";

import React from "react";
import useCep from "./useCep";
import { Box, Button, TextField, Typography } from "@mui/material";
import { SxProps } from "@mui/system"; 

interface cepComponentProps {
    label?: string;
    buttonLabel?: string;
    inputVariant?: "outlined" | "filled" | "standard";
    buttonColor?: "primary" | "secondary";
    buttonVariant?: "outlined" | "contained" | "text";
    buttonFullWidth?: boolean; 
    containerSx?: SxProps;
    inputSx?: SxProps;    
    buttonSx?: SxProps; 
    textsSx?: SxProps;    
}

const CepSearch: React.FC<cepComponentProps> = ({ label = "Digite o CEP", buttonLabel = "Buscar", inputVariant = "outlined", buttonColor = "primary", buttonVariant = "contained",
    buttonFullWidth = false, containerSx = {}, inputSx = {}, buttonSx = {}, textsSx = {}
}) => {
    const { cep, setCep, endereco, fetchEndereco } = useCep();

    return (
        <Box sx={{ ...containerSx }}>
            <TextField
                label={label}
                variant={inputVariant}
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                fullWidth
                margin="normal"
                sx={inputSx}
            />
            <Button
                variant={buttonVariant}
                color={buttonColor}
                onClick={fetchEndereco}
                fullWidth={buttonFullWidth} 
                sx={buttonSx}
            >
                {buttonLabel}
            </Button>

            {endereco.logradouro && (
                <Box mt={2}>
                    <Typography sx={textsSx} variant="body1"><strong>Rua</strong>: {endereco.logradouro}</Typography>
                    <Typography sx={textsSx} variant="body1"><strong>Unidade</strong>: {endereco.unidade}</Typography>
                    <Typography sx={textsSx} variant="body1"><strong>Bairro</strong>: {endereco.bairro}</Typography>
                    <Typography sx={textsSx} variant="body1"><strong>Cidade</strong>: {endereco.localidade}</Typography>
                    <Typography sx={textsSx} variant="body1"><strong>Estado</strong>: {endereco.uf}</Typography>
                    <Typography sx={textsSx} variant="body1"><strong>Região</strong>: {endereco.regiao}</Typography>
                    <Typography sx={textsSx} variant="body1"><strong>DDD</strong>: {endereco.ddd}</Typography>
                </Box>
            )}
        </Box>
    );
};

export default CepSearch;
