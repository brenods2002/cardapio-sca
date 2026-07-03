import { ArrowLeftIcon, ShoppingCart, UtensilsCrossed } from "lucide-react";
import { Button } from "../ui/button";
import type { ProdutoSelecionado } from "@/types";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { ModalCarrinho } from "../ModalCarrinho";
import { useLocation, useNavigate } from "react-router-dom";

interface HeaderProps {
  totalPedido: number;
  totalPreco: number;
  produto: ProdutoSelecionado[];
  onRemover: (id: number, observacao: string) => void;
  onLimpar: () => void;
}

export function Header({
  totalPedido,
  totalPreco,
  produto,
  onRemover,
  onLimpar,
}: HeaderProps) {
  const [modalCarrinhoAberto, setmMdalCarrinhoAberto] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const mostrarBotao = location.pathname !== "/";

  function handleVoltar() {
    navigate("/");
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex py-3 px-2 bg-white border-b border-gray-200 items-center justify-between sm:py-">
        <div className="flex items-center gap-2">
          {mostrarBotao && (
            <Button
              variant="outline"
              onClick={handleVoltar}
              aria-label="Voltar para o cardápio"
            >
              <ArrowLeftIcon />
            </Button>
          )}

          <div className="bg-primary rounded-lg p-2 flex">
            <UtensilsCrossed className="text-secondary fill sm:w-8 sm:h-8" />
          </div>
          <h2 className="font-bold text-primary text-2xl sm:text-3xl">
            Lá Cantineta
          </h2>
        </div>
        {!mostrarBotao && (
          <Button
            onClick={() => setmMdalCarrinhoAberto(true)}
            aria-label={`Ver meu pedido, } itens`}
            className="flex gap-2 bg-primary hover:bg-primary/90 text-muted font-semibold text-sm rounded-full py-2 px-3 transition-colors sm:py-4.5 sm:px-5"
          >
            <ShoppingCart />
            Meu pedido
            <Badge className="bg-destructive cursor-pointer text-muted text-xs font-bold rounded-full px-2 py-0.5 leading-none">
              {totalPedido}
            </Badge>
          </Button>
        )}

        <ModalCarrinho
          open={modalCarrinhoAberto}
          onFechar={() => setmMdalCarrinhoAberto(false)}
          produtos={produto}
          totalPreco={totalPreco}
          onRemover={onRemover}
          onLimpar={onLimpar}
        />
      </header>
    </>
  );
}
