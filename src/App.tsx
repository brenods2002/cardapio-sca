import { PhoneIcon } from "lucide-react";
import { Header } from "./Components/Heading";
import { usePedido } from "./hooks/usePedido";
import { Button } from "./Components/ui/button";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { FinalizarPedido } from "./pages/FinalizarPedido";
import { NotFound } from "./pages/NotFound";
import { MenuItems } from "./pages/MenuItems";

function App() {
  const {
    pedido,
    adicionarPedido,
    totalPedido,
    totalPreco,
    removerPedido,
    limparPedido,
  } = usePedido();
  const location = useLocation();

  const mostrarBotao = location.pathname === "/";

  const navigate = useNavigate();

  function handleFinalizar() {
    navigate("/finalizar");
  }

  return (
    <>
      <Header
        totalPreco={totalPreco}
        totalPedido={totalPedido}
        produto={pedido}
        onRemover={removerPedido}
        onLimpar={limparPedido}
      />

      <Routes>
        <Route
          path="/"
          element={<MenuItems adicionarPedido={adicionarPedido} />}
        />
        <Route
          path="/finalizar"
          element={
            <FinalizarPedido
              produtos={pedido}
              onLimpar={limparPedido}
              totalPreco={totalPreco}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {mostrarBotao && totalPedido > 0 && (
        <div className="fixed bottom-0 right-0 z-50 flex justify-center py-3 px-2">
          <Button
            onClick={handleFinalizar}
            className="p-5 rounded-xl text-lg font-bold"
          >
            <PhoneIcon className="fill-accent" />
            Finalizar Pedido?
          </Button>
        </div>
      )}
    </>
  );
}

export default App;
