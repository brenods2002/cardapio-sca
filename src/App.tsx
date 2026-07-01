import { Header } from "./Components/Heading";
import { HeroSection } from "./Components/HeroSection";
import { MenuItems } from "./Components/Menu";
import { usePedido } from "./hooks/usePedido";

function App() {
  const {
    pedido,
    adicionarPedido,
    totalPedido,
    totalPreco,
    removerPedido,
    limparPedido,
  } = usePedido();

  return (
    <>
      <Header
        totalPreco={totalPreco}
        totalPedido={totalPedido}
        produto={pedido}
        onRemover={removerPedido}
        onLimpar={limparPedido}
      />
      <HeroSection />
      <MenuItems adicionarPedido={adicionarPedido} />
    </>
  );
}

export default App;
