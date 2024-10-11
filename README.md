# Instalação e Configuração

Esta biblioteca foi desenvolvida para facilitar a busca de endereços a partir de CEPs brasileiros, utilizando a API pública do ViaCEP. Ela oferece dois recursos principais: um Hook chamado useCep e um componente React chamado CepSearch. Vamos mostrar como instalar e configurar essa biblioteca.

## Pré-requisitos

Antes de instalar, verifique se você já possui um projeto React configurado. Se ainda não, siga os passos para criar um projeto básico usando create-react-app:

```
npx create-react-app meu-projeto
cd meu-projeto
```

## Instalação

Para instalar a biblioteca, basta rodar o seguinte comando:

```
npm install cep-search-lib
```

Isso adicionará todos os arquivos e dependências necessárias ao seu projeto.

## Feats Implementadas

Atualmente, esta biblioteca possui duas funcionalidades principais, que facilitam a integração com a API ViaCEP:

**useCep**: Um Hook customizado que permite fazer buscas de endereço a partir de um CEP informado pelo usuário.
**CepSearch**: Um componente que utiliza o useCep para fornecer uma interface completa de busca de endereços, com campo de entrada e botão de ação.

**Agora que você instalou a biblioteca, veja abaixo os detalhes de uso para cada funcionalidade implementada.**


# useCep Hook - Documentação

O `useCep` é um Hook customizado desenvolvido para facilitar a busca de endereços no Brasil, utilizando a API pública do ViaCEP. Com ele, é possível obter dados completos de um endereço, como logradouro, bairro, cidade e estado, a partir de um CEP informado. Que roda do lado do cliente

## Exemplo de uso

```
import React from 'react';
import { useCep } from 'cep-search-lib';

const SimpleCepLogger = () => {
  const { cep, setCep, fetchEndereco } = useCep();

  const handleFetch = () => {
    fetchEndereco(); // Aciona a busca do endereço
    console.log('CEP atual:', cep);
  };

  return (
    <div>
      <input
        type="text"
        value={cep}
        onChange={(e) => setCep(e.target.value)}
        placeholder="Digite o CEP"
      />
      <button onClick={handleFetch}>Buscar</button>
    </div>
  );
};

export default SimpleCepLogger;

```


## Retornos

```
const { cep, setCep, endereco, fetchEndereco } = useCep();
```

### cep

Estado que armazena o valor atual do CEP inserido.

### setCep

Função responsável por atualizar o estado do cep.

### endereco 

Objeto que contém a resposta da API ViaCEP com os dados do endereço.

```
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
```

### fetchEndereco

Função que aciona a busca do endereço com base no CEP informado.

### tratamentos de erros 

O Hook lida com diferentes tipos de erros, exibindo mensagens apropriadas através de um toast.

### casos de erros 

#### 1. CEP inválido ou formato incorreto
**Motivo do erro**: O usuário inseriu um CEP que não tem 8 dígitos ou contém caracteres que não são numéricos.
- **Mensagem no toast**: "Por favor, insira um CEP válido com 8 dígitos numéricos."
  
Esse erro ocorre porque o CEP deve ter exatamente 8 dígitos numéricos. O código verifica se o valor inserido atende a esses critérios e, caso contrário, a busca nem é realizada.

#### 2. CEP não encontrado
**Motivo do erro**: O CEP informado é válido, mas não está registrado no ViaCEP.
- **Mensagem no toast**: "CEP não encontrado. Por favor, insira um CEP válido."

Esse erro ocorre quando a API do ViaCEP retorna a chave `erro: true`, indicando que o CEP não foi encontrado na base de dados. Isso pode acontecer quando o CEP é inexistente ou está incorreto.

#### 3. Erro na requisição ou problema na API
**Motivo do erro**: Houve algum problema com a requisição, como falha de conexão, erro no servidor, ou algum outro problema inesperado.
- **Mensagem no toast**: "Houve um problema ao buscar o endereço."

# CepSearch Component - Documentação

O `CepSearch` é um componente React que utiliza o Hook customizado `useCep` para permitir que os usuários busquem endereços a partir de um CEP. Ele fornece uma interface simples, onde o usuário pode digitar um CEP e visualizar os dados do endereço correspondente.

## Exemplo de Uso

Para utilizar o componente `CepSearch`, você deve importá-lo em seu arquivo e incluí-lo na sua árvore de componentes.

```
import React from 'react';
import { CepSearch } from 'cep-search-lib';

const BuscaEndereco = () => {
  return (
    <div>
      <h1>Buscar Endereço pelo CEP</h1>
      <CepSearch 
        label="Digite o CEP"
        buttonLabel="Buscar"
        inputVariant="outlined"
        buttonVariant="contained"
        buttonColor="primary"
      />
    </div>
  );
};

export default BuscaEndereco;

```

## Estrutura Visual do Componente

Ao renderizar o componente `CepSearch`, os seguintes elementos aparecerão na tela em ordem:

1. **TextField (Campo de Entrada)**:
   - **Descrição**: Um campo de entrada onde o usuário pode digitar o CEP.

   O `TextField` é exibido no topo, ocupando toda a largura disponível e com margens para melhor espaçamento.

2. **Button (Botão de Busca)**:
   - **Descrição**: Um botão que aciona a busca pelo endereço quando clicado.

   O botão é exibido logo abaixo do campo de entrada, com um estilo destacado que o torna fácil de identificar e acessar.

3. **Box (Container para Resultados)**:
   - **Descrição**: Um contêiner que é renderizado condicionalmente, contendo as informações do endereço, se disponíveis.

   Dentro do `Box`, os seguintes elementos são exibidos, um por um, caso o `endereco.logradouro` esteja presente:

   - **Typography (Exibição de Rua)**:
     - **Texto**: "Rua: {endereco.logradouro}"

   - **Typography (Exibição de Unidade)**:
     - **Texto**: "Unidade: {endereco.unidade}"

   - **Typography (Exibição de Bairro)**:
     - **Texto**: "Bairro: {endereco.bairro}"

   - **Typography (Exibição de Cidade)**:
     - **Texto**: "Cidade: {endereco.localidade}"

   - **Typography (Exibição de Estado)**:
     - **Texto**: "Estado: {endereco.uf}"

   - **Typography (Exibição de Região)**:
     - **Texto**: "Região: {endereco.regiao}"

   - **Typography (Exibição de DDD)**:
     - **Texto**: "DDD: {endereco.ddd}"


## Propriedades (`cepComponentProps`)

O componente `CepSearch` aceita várias propriedades que permitem personalizar tanto o comportamento quanto a aparência do componente.

### Propriedades disponíveis:

- **`label`** (`string`)  
  Texto exibido como rótulo do campo de entrada de CEP.  
  - *Default*: `"Digite o CEP"`

- **`buttonLabel`** (`string`)  
  Texto exibido no botão de busca.  
  - *Default*: `"Buscar"`

- **`inputVariant`** (`"outlined" | "filled" | "standard"`)  
  Define o estilo visual do campo de entrada.  
  - *Default*: `"outlined"`

- **`buttonColor`** (`"primary" | "secondary"`)  
  Cor do botão de busca.  
  - *Default*: `"primary"`

- **`buttonVariant`** (`"outlined" | "contained" | "text"`)  
  Variante do botão, alterando seu estilo visual.  
  - *Default*: `"contained"`

- **`buttonFullWidth`** (`boolean`)  
  Define se o botão ocupará toda a largura disponível.  
  - *Default*: `false`

- **`containerSx`** (`SxProps`)  
  Propriedades de estilo personalizadas para o contêiner do componente.

- **`inputSx`** (`SxProps`)  
  Propriedades de estilo personalizadas para o campo de entrada.

- **`buttonSx`** (`SxProps`)  
  Propriedades de estilo personalizadas para o botão de busca.


