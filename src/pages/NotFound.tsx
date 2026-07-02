import { Button } from "@/Components/ui/button";
import { useNavigate } from "react-router-dom";

export function NotFound() {
  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate("/");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-lg text-muted-foreground">Página não encontrada.</p>
      <Button onClick={handleVoltar} className="p-6 text-lg">
        Ir para o cardápio
      </Button>
    </div>
  );
}
