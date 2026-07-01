// hooks/usePedido.ts
import type { ProdutoSelecionado } from "@/types";
import { useState } from "react";

export function usePedido() {
  const [pedido, setPedido] = useState<ProdutoSelecionado[]>([]);

  function adicionarPedido(produto: ProdutoSelecionado) {
    setPedido((prev) => {
      const existente = prev.find(
        (i) => i.id === produto.id && i.observacao === produto.observacao,
      );

      if (existente) {
        return prev.map((i) =>
          i.id === produto.id && i.observacao === produto.observacao
            ? { ...i, quantidade: i.quantidade + produto.quantidade }
            : i,
        );
      }

      return [...prev, produto];
    });
  }

  function removerPedido(id: number, observacao: string) {
    setPedido((prev) =>
      prev.filter((i) => !(i.id === id && i.observacao === observacao)),
    );
  }

  function limparPedido() {
    setPedido([]);
  }

  const totalPedido = pedido.reduce((acc, i) => acc + i.quantidade, 0);
  const totalPreco = pedido.reduce((acc, i) => acc + i.preco * i.quantidade, 0);

  return {
    pedido,
    adicionarPedido,
    removerPedido,
    limparPedido,
    totalPedido,
    totalPreco,
  };
}
