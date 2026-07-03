import { useState } from "react";

interface FormData {
  nome: string;
  telefone: string;
  observacao: string;
  delivery: boolean;
  endereco: string;
  formaPagamento: string;
}

const formInicial: FormData = {
  nome: "",
  telefone: "",
  observacao: "",
  delivery: false,
  endereco: "",
  formaPagamento: "",
};

export function useFinalizarPedidoForm() {
  const [form, setForm] = useState<FormData>(formInicial);

  const [erros, setErros] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );
  function atualizar(campo: keyof FormData, valor: string | boolean) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
    setErros((prev) => ({ ...prev, [campo]: "" }));
  }

  function validar() {
    const novosErros: Partial<Record<keyof FormData, string>> = {};

    if (!form.nome.trim()) novosErros.nome = "Nome é obrigatório";
    if (!form.telefone.trim()) novosErros.telefone = "Telefone é obrigatório";
    if (form.delivery && !form.formaPagamento)
      novosErros.formaPagamento = "Selecione a forma de pagamento";
    if (form.delivery && !form.endereco.trim())
      novosErros.endereco = "Endereço é obrigatório para delivery";

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  return { form, erros, atualizar, validar };
}
