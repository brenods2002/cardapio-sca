import { PhoneIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export function BotaoFinalizar() {
  const navigate = useNavigate();
  function handleFinalizar() {
    navigate("/finalizar");
  }
  return (
    <div className="fixed bottom-0 right-0 z-50 flex justify-center py-3 px-2">
      <Button
        onClick={handleFinalizar}
        className="p-5 rounded-xl text-lg font-bold sm:py-6 bg-green-600 hover:bg-green-700 shadow-lg"
      >
        <PhoneIcon />
        Finalizar Pedido?
      </Button>
    </div>
  );
}
