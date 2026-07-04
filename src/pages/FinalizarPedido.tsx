import { formatarPreco } from "@/utils/formatPrice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircleIcon, ReceiptIcon } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import type { ProdutoSelecionado } from "@/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/Components/ui/alert-dialog";
import { useFinalizarPedidoForm } from "@/hooks/useFinalizarPedidoForm";

interface FinalizarPedidoProps {
  produtos: ProdutoSelecionado[];
  totalPreco: number;
  onLimpar: () => void;
}

export function FinalizarPedido({
  produtos,
  totalPreco,
  onLimpar,
}: FinalizarPedidoProps) {
  const navigate = useNavigate();
  const { form, erros, atualizar, validar } = useFinalizarPedidoForm();

  const [dialogAberto, setDialogAberto] = useState(false);

  function formatarTelefone(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 11); // só números, máx 11 dígitos

    if (digits.length <= 2) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    }
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  function handleEnviar() {
    if (!validar()) return;
    setDialogAberto(true);
  }

  function handleConfirmarPedido() {
    onLimpar();
    navigate("/");
  }

  if (produtos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-muted-foreground">
        <p>Nenhum item no pedido.</p>
        <Button onClick={() => navigate("/")}>Voltar ao cardápio</Button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 pt-24 pb-10 space-y-6">
      <div className="flex items-center justify-center gap-3">
        <ReceiptIcon />
        <h1 className="text-xl font-bold">Finalizar Pedido</h1>
      </div>
      <div className="border rounded-xl p-4 space-y-3">
        <p className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
          Resumo
        </p>
        {produtos.map((item) => (
          <div
            key={`${item.id}-${item.observacao}`}
            className="flex justify-between text-sm"
          >
            <span>
              {item.quantidade}x {item.nome}
              {item.observacao && (
                <span className="text-muted-foreground">
                  {" "}
                  · {item.observacao}
                </span>
              )}
            </span>
            <span className="font-medium">
              {formatarPreco(item.preco * item.quantidade)}
            </span>
          </div>
        ))}
        <div className="border-t pt-2 flex justify-between font-bold">
          <span>Total</span>
          <span>{formatarPreco(totalPreco)}</span>
        </div>
      </div>

      <div className="border rounded-xl p-4 space-y-4">
        <p className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
          Seus dados
        </p>

        <div className="space-y-1">
          <Label htmlFor="nome">Nome</Label>
          <Input
            id="nome"
            placeholder="Seu nome completo"
            value={form.nome}
            onChange={(e) => atualizar("nome", e.target.value)}
          />
          {erros.nome && (
            <p className="text-xs text-destructive">{erros.nome}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="telefone">Telefone</Label>
          <Input
            id="telefone"
            type="number"
            placeholder="(00) 00000-0000"
            value={form.telefone}
            onChange={(e) =>
              atualizar("telefone", formatarTelefone(e.target.value))
            }
          />
          {erros.telefone && (
            <p className="text-xs text-destructive">{erros.telefone}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="observacao">Observação geral</Label>
          <Textarea
            id="observacao"
            placeholder="Alguma observação para o pedido?"
            value={form.observacao}
            onChange={(e) => atualizar("observacao", e.target.value)}
            rows={3}
            maxLength={200}
            className="resize-none w-full"
          />
        </div>
      </div>

      <div className="border rounded-xl p-4 space-y-4">
        <div className="flex items-center justify-between">
          <p className="font-semibold">Delivery?</p>
          <div className="flex gap-2">
            <Button
              size="lg"
              variant={form.delivery ? "default" : "outline"}
              onClick={() => atualizar("delivery", true)}
            >
              Sim
            </Button>
            <Button
              size="lg"
              variant={!form.delivery ? "default" : "outline"}
              onClick={() => atualizar("delivery", false)}
            >
              Não
            </Button>
          </div>
        </div>

        {form.delivery && (
          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="endereco">Endereço de entrega</Label>
              <Input
                id="endereco"
                placeholder="Rua, número, bairro..."
                value={form.endereco}
                onChange={(e) => atualizar("endereco", e.target.value)}
              />
              {erros.endereco && (
                <p className="text-xs text-destructive">{erros.endereco}</p>
              )}
            </div>
            <div className="border rounded-xl p-4 space-y-2">
              <Label htmlFor="pagamento">Forma de pagamento</Label>
              <Select
                value={form.formaPagamento}
                onValueChange={(val) => atualizar("formaPagamento", val)}
              >
                <SelectTrigger id="pagamento">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pix">Pix</SelectItem>
                  <SelectItem value="dinheiro">Dinheiro</SelectItem>
                  <SelectItem value="cartao">Cartão</SelectItem>
                </SelectContent>
              </Select>
              {erros.formaPagamento && (
                <p className="text-xs text-destructive">
                  {erros.formaPagamento}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <AlertDialog open={dialogAberto} onOpenChange={setDialogAberto}>
        <Button
          className="w-full h-12 font-semibold text-base"
          onClick={handleEnviar}
        >
          <CheckCircleIcon className="w-5 h-5 mr-2" />
          Confirmar pedido • {formatarPreco(totalPreco)}
        </Button>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Você deseja confirmar a finalização do seu pedido?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Ao confirmar seu pedido será enviado automaticamente para o
              estabelecimento.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="p-5">Cancelar</AlertDialogCancel>
            <AlertDialogAction className="p-5" onClick={handleConfirmarPedido}>
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
