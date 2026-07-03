import { useMemo, useState } from "react";
import { produtos } from "@/data/data";
import { categorias } from "@/types";
import type { Categorias, ProdutoSelecionado } from "@/types";
import { useCardapioModal } from "@/hooks/useCardapioModel";
import { HeroSection } from "@/Components/HeroSection";
import { ModalItemCardapio } from "@/Components/ModalItemCardapio";
import { ProdutoCard } from "@/Components/CardapioMenu/ProdutoCard";
import { NavCategorias } from "@/Components/CardapioMenu/NavCategorias";

interface MenuCardapioProps {
  adicionarPedido: (produto: ProdutoSelecionado) => void;
}

export function MenuCardapio({ adicionarPedido }: MenuCardapioProps) {
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

  const produtosFiltrados = useMemo(
    () =>
      categoriaSelecionada === "Todos"
        ? produtos
        : produtos.filter((p) => p.categoria === categoriaSelecionada),
    [categoriaSelecionada],
  );

  return (
    <>
      <HeroSection />
      <div className="max-w-5xl sm:max-w-full mx-auto px-2 space-y-4">
        <NavCategorias
          categorias={categorias}
          categoriaSelecionada={categoriaSelecionada}
          onSelecionarCategoria={setCategoriaSelecionada}
        />

        <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 items-stretch">
          {produtosFiltrados.map((p) => (
            <ProdutoCard
              key={p.id}
              produto={p}
              onSelecionar={handleClickSelect}
            />
          ))}
        </div>
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
    </>
  );
}
