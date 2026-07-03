# Cardápio SCA

## Descrição do sistema

O Cardápio ProSistemas é uma aplicação web desenvolvida em React + TypeScript para simular um cardápio digital de uma pizzaria/lancheira. O sistema permite:

- visualizar produtos por categorias;
- selecionar itens do cardápio e ajustar quantidade;
- adicionar observações personalizadas aos itens;
- montar um carrinho de pedidos;
- finalizar o pedido com dados do cliente, opção de entrega e forma de pagamento.

A interface foi construída com Vite, React Router e componentes estilizados com Tailwind CSS e shadcn/ui.

## Tecnologias utilizadas

- React
- TypeScript
- Vite
- React Router DOM
- Tailwind CSS
- lucide-react
- shadcn/ui

## Requisitos

Antes de executar o projeto, certifique-se de ter instalado:

- Node.js 18 ou superior
- npm ou yarn

## Como executar o projeto

1. Acesse a pasta do projeto de acordo com o caminho em que estiver a pasta:

   ```bash
   cd c:\cardapio-sca
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Abra o navegador no endereço:
   ```text
   http://localhost:5173
   ```

## Scripts disponíveis

- `npm run dev` — inicia o ambiente de desenvolvimento.
- `npm run build` — gera a build de produção.
- `npm run preview` — visualiza a build localmente.
- `npm run lint` — executa a análise estática do projeto.

## Estrutura principal

- `src/pages` — páginas do sistema como cardápio e finalização de pedido.
- `src/components` — componentes reutilizáveis da interface.
- `src/hooks` — lógica de estado e comportamento da aplicação.
- `src/data` — dados dos produtos exibidos no cardápio.

## Observação

Este projeto foi desenvolvido como uma aplicação frontend para experiência de navegação e pedido em um ambiente de cardápio digital.
