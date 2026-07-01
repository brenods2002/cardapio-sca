export type Categorias =
  | "Todos"
  | "Lanches"
  | "Pizzas"
  | "Porções"
  | "Bebidas"
  | "Combos";

export const categorias: Categorias[] = [
  "Todos",
  "Lanches",
  "Pizzas",
  "Porções",
  "Bebidas",
  "Combos",
];

export interface Produtos {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  categoria: Categorias;
  imagem: string;
}

export interface ProdutoSelecionado extends Produtos {
  quantidade: number;
  observacao: string;
}
