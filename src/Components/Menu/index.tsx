import { Button } from "../ui/button";
import { useState } from "react";
import { produtos } from "@/data/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { formatarPreco } from "@/utils/formatPrice";
import { Badge } from "../ui/badge";
import { categorias } from "@/types";
import type { Categorias, ProdutoSelecionado } from "@/types";
import { useCardapioModal } from "@/hooks/useCardapioModel";
import { ModalItemCardapio } from "../ModalItemCardapio";
import { HeroSection } from "../HeroSection";

interface MenuItemProps {
  adicionarPedido: (produto: ProdutoSelecionado) => void;
}

export function MenuItems({ adicionarPedido }: MenuItemProps) {
  const {
    produtoModal,
    quantidade,
    observacao,
    setObservacao,
    handleClickSelect,
    fecharModal,
    incrementar,
    decrementar,
    confirmarSelecao,
  } = useCardapioModal();

  const [categoriaSelecionada, setCategoriaSelecionada] =
    useState<Categorias>("Todos");

  const produtosFiltrados =
    categoriaSelecionada === "Todos"
      ? produtos
      : produtos.filter(
          (produtos) => produtos.categoria === categoriaSelecionada,
        );

  return (
    <div className="max-w-5xl mx-auto px-2 space-y-4">
      <HeroSection />
      <nav className="space-x-3 flex overflow-x-scroll no-scrollbar py-4 px-2 border-b border-gray-300">
        {" "}
        {categorias.map((categoria) => (
          <Button
            key={categoria}
            className={`p-4.5 ${categoriaSelecionada === categoria ? "bg-primary/70 text-white scale-[1.05]" : "bg-primary hover:bg-primary/90"}`}
            onClick={() => setCategoriaSelecionada(categoria)}
          >
            {categoria}
          </Button>
        ))}
      </nav>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 items-stretch">
        {produtosFiltrados.map((produto) => (
          <Card
            key={produto.id}
            className="overflow-hidden h-full flex flex-col"
          >
            <div className="aspect-video px-2 w-full overflow-hidden">
              <img
                src={produto.imagem}
                alt={produto.nome}
                className="h-full w-full rounded-md object-cover"
              />
            </div>
            <CardHeader className="border-b border-gray-200 flex-1">
              <CardTitle>{produto.nome}</CardTitle>
              <CardDescription className=" p-1">
                {produto.descricao}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <Badge className="text-md font-bold" variant="ghost">
                {formatarPreco(produto.preco)}
              </Badge>
              <Button
                onClick={() => handleClickSelect(produto)}
                variant="outline"
                className="h-8"
              >
                Selecionar
              </Button>
            </CardContent>
          </Card>
        ))}
        <ModalItemCardapio
          produto={produtoModal}
          quantidade={quantidade}
          observacao={observacao}
          onIncrementar={incrementar}
          onDecrementar={decrementar}
          onObservacaoChange={setObservacao}
          onFechar={fecharModal}
          onConfirmar={() => confirmarSelecao(adicionarPedido)}
        />
      </div>
    </div>
  );
}
