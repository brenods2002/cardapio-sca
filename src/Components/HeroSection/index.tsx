export function HeroSection() {
  return (
    <div className="pt-22 px-2 py-4 sm:justify-center flex bg-gray-100 border-b border-gray-200">
      <div className="space-y-3 flex flex-col">
        <p className="text-muted-foreground font-bold text-xs sm:opacity-0 uppercase ">
          CARDÁPIO ONLINE
        </p>
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-6xl font-extrabold text-slate-700">
            O que vai ser <br />
            <span className="text-amber-500">hoje?</span>
          </h1>
          <p className="text-muted-foreground text-xs sm:text-[15px] ">
            Escolha sua comida, sua bebida, depois preencha seus dados e
            finalize o pedido!
          </p>
        </div>
      </div>
    </div>
  );
}
