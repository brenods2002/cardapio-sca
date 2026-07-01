import type { Produtos, ProdutoSelecionado } from "@/types";
import { useState } from "react";

export function useCardapioModal() {
  const [produtoModal, setProdutoModal] = useState<Produtos | null>(null);
  const [quantidade, setQuantidade] = useState(1);
  const [observacao, setObservacao] = useState("");

  function handleClickSelect(produto: Produtos) {
    setProdutoModal(produto);
    setQuantidade(1);
    setObservacao("");
  }
  function fecharModal() {
    setProdutoModal(null);
  }

  function incrementar() {
    setQuantidade((q) => q + 1);
  }

  function decrementar() {
    setQuantidade((q) => Math.max(1, q - 1));
  }

  function confirmarSelecao(
    onConfirmar: (produto: ProdutoSelecionado) => void,
  ) {
    if (!produtoModal) return;
    onConfirmar({
      ...produtoModal,
      quantidade,
      observacao,
    });
    fecharModal();
  }
  return {
    produtoModal,
    quantidade,
    observacao,
    setObservacao,
    handleClickSelect,
    fecharModal,
    incrementar,
    decrementar,
    confirmarSelecao,
  };
}
