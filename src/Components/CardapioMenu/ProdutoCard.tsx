import type { Produtos } from "@/types";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { formatarPreco } from "@/utils/formatPrice";

interface ProdutoCardProps {
  produto: Produtos;
  onSelecionar: (produto: Produtos) => void;
}

export function ProdutoCard({ produto, onSelecionar }: ProdutoCardProps) {
  return (
    <Card className="overflow-hidden h-full p-2 sm:p-4 flex flex-col hover:scale-[1.01] transition-all duration-300">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={produto.imagem}
          alt={produto.nome}
          className="h-full w-full rounded-md object-cover"
        />
      </div>

      <CardHeader className="border-b border-gray-200 flex-1 px-2 sm:px-4">
        <CardTitle className="truncate text-base sm:text-xl">
          {produto.nome}
        </CardTitle>
        <CardDescription className="line-clamp-2 text-xs sm:text-sm p-1">
          {produto.descricao}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex items-center justify-between gap-2 px-2 sm:px-4 flex-wrap">
        <Badge
          className="text-xs sm:text-md font-bold px-2 sm:p-3 shrink-0"
          variant="outline"
        >
          {formatarPreco(produto.preco)}
        </Badge>
        <Button
          onClick={() => onSelecionar(produto)}
          className="h-8 px-3 sm:p-4.5 shadow-2xl shrink-0"
        >
          Selecionar
        </Button>
      </CardContent>
    </Card>
  );
}
