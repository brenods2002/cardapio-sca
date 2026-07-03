import type { Categorias } from "@/types";
import { Button } from "../ui/button";

interface NavCategoriasProps {
  categorias: Categorias[];
  categoriaSelecionada: Categorias;
  onSelecionarCategoria: (categoria: Categorias) => void;
}

export function NavCategorias({
  categorias,
  categoriaSelecionada,
  onSelecionarCategoria,
}: NavCategoriasProps) {
  return (
    <nav className="space-x-3 flex overflow-x-scroll no-scrollbar py-4 px-2 border-b border-gray-300 sm:justify-center">
      {categorias.map((categoria) => (
        <Button
          key={categoria}
          className={`p-4 w-24 sm:rounded-2xl sm:text-[16px] sm:p-6 sm:font-bold ${categoriaSelecionada === categoria ? "bg-primary/70 text-white scale-[1.05]" : "bg-primary hover:bg-primary/90"}`}
          onClick={() => onSelecionarCategoria(categoria)}
        >
          {categoria}
        </Button>
      ))}
    </nav>
  );
}
