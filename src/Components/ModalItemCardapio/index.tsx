import type { Produtos } from "@/types/type";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { formatarPreco } from "@/utils/formatPrice";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";

interface ModalItemCardapioProps {
  produto: Produtos | null;
  quantidade: number;
  observacao: string;
  onIncrementar: () => void;
  onDecrementar: () => void;
  onObservacaoChange: (valor: string) => void;
  onFechar: () => void;
  onConfirmar: () => void;
}

export function ModalItemCardapio({
  produto,
  quantidade,
  observacao,
  onIncrementar,
  onDecrementar,
  onObservacaoChange,
  onFechar,
  onConfirmar,
}: ModalItemCardapioProps) {
  const total = produto ? produto.preco * quantidade : 0;

  return (
    <Dialog open={!!produto} onOpenChange={(open) => !open && onFechar()}>
      <DialogContent
        className="w-full sm-max-w-md rounded-xl overflow-hidden p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {produto && (
          <>
            <img
              src={produto?.imagem}
              alt={produto?.nome}
              className="w-full h-48 shrink-0 rounded-xl object-cover"
            />
            <div className="pb-2">
              <div className="border rounded-xl p-2">
                <DialogHeader className="mt-2">
                  <DialogTitle className="font-bold">
                    {produto?.nome}
                  </DialogTitle>
                  <DialogDescription>{produto?.descricao}</DialogDescription>
                </DialogHeader>

                <Badge variant="outline" className="p-3 mt-2 font-bold text-md">
                  {formatarPreco(produto.preco)}
                </Badge>
                <div className="mt-4 space-y-1">
                  <label className="block font-medium mb-1">Observação</label>
                  {/* Aplicado class para previnir quebra do elemento */}
                  <Textarea
                    value={observacao}
                    onChange={(e) => onObservacaoChange(e.target.value)}
                    placeholder="Ex: sem cebola, ponto da carne..."
                    className="resize-none w-full wrap-break-word overflow-wrap-anywhere whitespace-pre-wrap"
                    maxLength={150}
                    rows={3}
                  />
                  <span className="text-xs text-muted-foreground ml-2">
                    {observacao.length}/150
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between my-5">
                <div className="flex items-center border rounded-full px-3 py-1 space-x-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={onDecrementar}
                    disabled={quantidade <= 1}
                  >
                    <MinusIcon />
                  </Button>

                  <Badge
                    variant="secondary"
                    className="p-4 text-md text-center font-bold"
                  >
                    {quantidade}
                  </Badge>

                  <Button size="icon" variant="ghost" onClick={onIncrementar}>
                    <PlusIcon />
                  </Button>
                </div>
                <Button className="h-10 w-min" onClick={onConfirmar}>
                  Adicionar • {formatarPreco(total)}
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
