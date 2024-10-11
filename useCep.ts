"use client";
import { useState } from "react";
import { toast } from "react-toastify";

interface cepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro: boolean;
}

const useCep = () => {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState<Partial<cepResponse>>({
    cep: "",
    logradouro: "",
    complemento: "",
    unidade: "",
    bairro: "",
    localidade: "",
    uf: "",
    estado: "",
    regiao: "",
    ibge: "",
    gia: "",
    ddd: "",
    siafi: "",
    erro: false,
  });

  const fetchEndereco = async () => {
    try {
      if (!cep || cep.length !== 8 || isNaN(Number(cep))) {
        toast.error('Por favor, insira um CEP válido com 8 dígitos numéricos.');
        return;
      }

      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      
      const data: cepResponse = await response.json();

      if (data.erro) {

        toast.error('CEP não encontrado. Por favor, insira um CEP válido.');
        return;

      }

      setEndereco({
        cep: data.cep,
        logradouro: data.logradouro,
        complemento: data.complemento,
        unidade: data.unidade,
        bairro: data.bairro,
        localidade: data.localidade,
        uf: data.uf,
        estado: data.estado,
        regiao: data.regiao,
        ibge: data.ibge,
        gia: data.gia,
        ddd: data.ddd,
        siafi: data.siafi,
      });

      toast.success('Endereço encontrado com sucesso')

    } catch (error) {
      toast.error('Houve um problema ao buscar o endereço.');
      console.error("Erro ao buscar o CEP", error);
    }
  };

  return {
    cep,
    setCep,
    endereco,
    fetchEndereco,
  };
};

export default useCep;
