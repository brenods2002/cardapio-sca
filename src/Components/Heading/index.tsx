import { ShoppingCart, UtensilsCrossed } from "lucide-react";
import { Button } from "../ui/button";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex py-3 px-2 bg-white border-b border-gray-200 items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="bg-primary rounded-lg p-2 flex">
          <UtensilsCrossed className="text-secondary" />
        </div>
        <h2 className="font-bold text-primary text-2xl">Lá Cantineta</h2>
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
  );
}
