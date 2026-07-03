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
    <nav className="space-x-2 flex overflow-x-scroll no-scrollbar py-4 px-2 border-b border-gray-300 sm:justify-center">
      {categorias.map((categoria) => (
        <Button
          key={categoria}
          className={`p-4 w-20 sm:w-24 sm:rounded-2xl sm:text-[16px] sm:p-6 sm:font-bold transition duration-300 ease-in-out  ${categoriaSelecionada === categoria ? "bg-amber-500 hover:bg-amber-600 text-white scale-[1.05]" : "bg-primary hover:-translate-y-1 hover:bg-primary/90"}`}
          onClick={() => onSelecionarCategoria(categoria)}
        >
          {categoria}
        </Button>
      ))}
    </nav>
  );
}
