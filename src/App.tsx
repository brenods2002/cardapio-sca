import { Header } from "./Components/Header";
import { usePedido } from "./hooks/usePedido";
import { Route, Routes, useLocation } from "react-router-dom";
import { FinalizarPedido } from "./pages/FinalizarPedido";
import { NotFound } from "./pages/NotFound";
import { MenuCardapio } from "./pages/MenuCardapio";
import { BotaoFinalizar } from "./Components/CardapioMenu/BotaoFinalizar";

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
          element={<MenuCardapio adicionarPedido={adicionarPedido} />}
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
      {mostrarBotao && totalPedido > 0 && <BotaoFinalizar />}
    </>
  );
}

export default App;
