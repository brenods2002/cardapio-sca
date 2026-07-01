import { Header } from "./Components/Heading";
import { HeroSection } from "./Components/HeroSection";
import { MenuItems } from "./Components/Menu";
import { usePedido } from "./hooks/usePedido";

function App() {
  const { pedido, adicionarPedido, totalPedido, totalPreco } = usePedido();

  return (
    <>
      <Header
        totalPreco={totalPreco}
        totalPedido={totalPedido}
        produto={pedido}
      />
      <HeroSection />
      <MenuItems adicionarPedido={adicionarPedido} />
    </>
  );
}

export default App;
