import type { ProdutoSelecionado } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { ShoppingBagIcon, ShoppingCartIcon, Trash2Icon } from "lucide-react";
import { formatarPreco } from "@/utils/formatPrice";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useNavigate } from "react-router-dom";

interface ModalCarrinhoProps {
  open: boolean;
  onFechar: () => void;
  produtos: ProdutoSelecionado[];
  totalPreco: number;
  onRemover: (id: number, observacao: string) => void;
  onLimpar: () => void;
}

export function ModalCarrinho({
  open,
  onFechar,
  produtos,
  totalPreco,
  onRemover,
  onLimpar,
}: ModalCarrinhoProps) {
  const navigate = useNavigate();

  function handleFinalizar() {
    navigate("/finalizar");
    onFechar();
  }

  return (
    <Dialog open={open} onOpenChange={(aberto) => !aberto && onFechar()}>
      <DialogContent className="sm:max-w-md w-full p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-5 pt-5 pb-3 border-b">
          <DialogTitle className="flex text-xl font-bold gap-2 items-center justify-center">
            <ShoppingBagIcon className="w-6 h-6" />
            Meu Pedido
          </DialogTitle>
        </DialogHeader>
        {produtos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-2">
            <ShoppingCartIcon />
            <p className="text-sm">Seu carrinho de pedidos está vazio!</p>
          </div>
        ) : (
          <>
            <div className="overflow-y-auto max-h-[50vh] px-4 py-3 space-y-3">
              {produtos.map((produto) => (
                <div
                  key={produto.id}
                  className="flex items-center gap-3 border rounded-md p-2"
                >
                  <img
                    alt={produto.nome}
                    src={produto.imagem}
                    className="w-14 h-14 object-cover shrink-0 rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="font-bold text-sm truncate">
                        {produto.nome}
                      </h2>
                      <Button
                        size="icon"
                        variant="destructive"
                        className="h-7 w-7 shrink-0"
                        onClick={() =>
                          onRemover(produto.id, produto.observacao)
                        }
                      >
                        <Trash2Icon className="h-3.5 w-3.5" />
                      </Button>
                    </div>

                    {produto.observacao && (
                      <p className="text-xs text-muted-foreground truncate">
                        Obs: {produto.observacao}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm font-semibold">
                        {formatarPreco(produto.preco)}
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        {produto.quantidade}x
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t px-5 py-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total</span>
                <span className="font-bold text-lg">
                  {formatarPreco(totalPreco)}
                </span>
              </div>

              <Button
                onClick={handleFinalizar}
                className="w-full font-bold h-11"
              >
                Finalizar Pedido
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full h-9">
                    Limpar pedido
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Você deseja limpar todos itens do pedido?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Ao confirmar serão removidos todos os itens. Será
                      necessário adicionar novamente os itens.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction variant="destructive" onClick={onLimpar}>
                      Confirmar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
