import { ShoppingCart, StarIcon, UtensilsCrossed } from "lucide-react";
import { Button } from "./Components/ui/button";
import { useState } from "react";
import { categorias, type Produtos } from "./types/type";
import type { Categorias } from "./types/type";
import { produtos } from "./data/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./Components/ui/card";

function App() {
  const [categoriaSelecionada, setCategoriaSelecionada] =
    useState<Categorias>("Todos");

  const produtosFiltrados =
    categoriaSelecionada === "Todos"
      ? produtos
      : produtos.filter(
          (produtos) => produtos.categoria === categoriaSelecionada,
        );

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 flex py-3 px-2 bg-white border-b border-gray-200 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary rounded-lg p-2 flex">
            <UtensilsCrossed className="text-secondary" />
          </div>
          <h2 className="font-bold text-primary text-lg">Cardápio Digital</h2>
        </div>

        <Button
          aria-label={`Ver meu pedido, } itens`}
          className="flex gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm rounded-full py-2 px-3 transition-colors"
        >
          <ShoppingCart size={18} aria-hidden />
          <span>Meu pedido</span>
          <span className="bg-destructive cursor-pointer text-muted text-xs font-bold rounded-full px-2 py-0.5 leading-none">
            0
          </span>
        </Button>
      </header>

      <div className="pt-22 px-2 py-4 bg-gray-100 border-b border-gray-200">
        <div className="space-y-3 flex flex-col">
          <p className="text-muted-foreground font-bold text-xs uppercase">
            CARDÁPIO ONLINE
          </p>
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-slate-700">
              O que vai ser <br />
              <span className="text-amber-500">hoje?</span>
            </h1>
            <p className="text-muted-foreground text-xs">
              Escolha sua comida, sua bebida, depois preencha seus dados e
              finalize o pedido.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-2 space-y-4">
        <nav className="space-x-3 flex overflow-x-scroll no-scrollbar py-4 px-2 border-b border-gray-300">
          {" "}
          {categorias.map((categoria) => (
            <Button
              key={categoria}
              className={`p-5 ${categoriaSelecionada === categoria ? "bg-red-600" : "bg-primary"}`}
              variant="outline"
              onClick={() => setCategoriaSelecionada(categoria)}
            >
              {categoria}
            </Button>
          ))}
        </nav>

        <div className="grid grid-cols-2 gap-3">
          {produtosFiltrados.map((produto) => (
            <Card>
              <CardHeader>
                <CardTitle>
                  <h2>{produto.nome}</h2>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <img src={produto.imagem}></img>
                <CardDescription>
                  <p>{produto.descricao}</p>
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
