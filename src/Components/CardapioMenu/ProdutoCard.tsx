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
    <Card className="overflow-hidden h-full sm:p-4 flex flex-col hover:scale-[1.01] transition-all duration-300">
      <div className="aspect-video px-2 w-full overflow-hidden">
        <img
          src={produto.imagem}
          alt={produto.nome}
          className="h-full w-full rounded-md object-cover"
        />
      </div>
      <CardHeader className="border-b border-gray-200 flex-1">
        <CardTitle className="truncate sm:text-xl">{produto.nome}</CardTitle>
        <CardDescription className="line-clamp-2 p-1">
          {produto.descricao}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <Badge className="text-md font-bold sm:p-3" variant="outline">
          {formatarPreco(produto.preco)}
        </Badge>
        <Button
          onClick={() => onSelecionar(produto)}
          className="h-8 sm:h-0 sm:p-4 shadow-2xl"
        >
          Selecionar
        </Button>
      </CardContent>
    </Card>
  );
}
