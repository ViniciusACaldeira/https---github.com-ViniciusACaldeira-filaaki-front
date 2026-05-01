import { use, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "../../context/AuthProvider";
import { BASE_URL } from "../../config/env";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { cadastrarFila } from "../../services/api";

export default function Onboarding() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const { user, updateUser } = useAuth( );

    const [form, setForm] = useState({
        nome: "",
        tipo: "Comum",
        endereco: "",
        slug: "",
        prefixo_comum: "A",
        prefixo_prioridade: "P",
        nome_prioridade: "Preferencial",
    });

    let link = ( `${ BASE_URL }/c/${user?.slug}/${form.slug}`);

    const onClickCadastrarFila = async ( ) => {
        try
        {
            await cadastrarFila( form );
            toast.success( `Fila ${form.nome} criada com sucesso!` );
            updateUser({ tem_fila: true });

            navigate("/d");
        }
        catch( error )
        {
            console.log( error );
            toast.error( "Falha ao tentar cadastrar fila. Tente novamente." );
        }
    }

    const next = () => setStep((s) => s + 1);
    const prev = () => setStep((s) => s - 1);

    const handleChange = (field, value) => {
        if (field === "endereco") {
        setForm((prev) => ({
            ...prev,
            endereco: value,
            slug: generateSlug(value),
        }));
        } else {
        setForm((prev) => ({ ...prev, [field]: value }));
        }
    };

    const onChangeTipo = (v) => {
        setForm((prev) => ({
            ...prev,
            tipo: v,
            ...(v === "Comum" && {
                prefixo_comum: "A",
                prefixo_prioridade: "P",
                nome_prioridade: "Preferencial",
            }),
        }));
    };

  const generateSlug = (text) =>
    text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
        

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-2xl space-y-6">

        {/* HEADER */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">
            🚀 Configuração da sua fila
          </h1>

          <p className="text-muted-foreground text-sm">
            Vamos preparar tudo para você começar a atender seus clientes
          </p>

          <p className="text-xs text-muted-foreground">
            Etapa {step} de 4
          </p>
        </div>

        <Progress value={(step / 4) * 100} />

        <Card>
          <CardContent className="p-6 space-y-6">

            {/* STEP 1 - NOME */}
            {step === 1 && (
              <>
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold">
                    🏷️ Nome da fila
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    Esse nome será exibido para seus clientes
                  </p>
                </div>

                <Input
                  placeholder="Ex: Atendimento rápido"
                  value={form.nome}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      nome: e.target.value,
                      endereco: e.target.value,
                      slug: generateSlug(e.target.value),
                    })
                  }
                />

                <div className="flex justify-end">
                  <Button className="cursor-pointer" onClick={next}>
                    Continuar →
                  </Button>
                </div>
              </>
            )}

            {/* STEP 2 - TIPO */}
            {step === 2 && (
              <>
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold">
                    ⚙️ Tipo de atendimento
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    Como sua fila irá funcionar
                  </p>
                </div>

                <RadioGroup
                  value={form.tipo}
                  onValueChange={(v) =>
                    onChangeTipo( v )
                  }
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="Comum" />
                    Apenas comum
                  </div>

                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="Preferencial" />
                    Com preferencial
                  </div>
                </RadioGroup>

                {form.tipo === "Preferencial" && (
                  <div className="space-y-3 mt-4">
                    <div>
                      <Label>Nome do preferencial</Label>
                      <Input
                        value={form.nome_prioridade}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            nome_prioridade: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label>Prefixo comum</Label>
                        <Input
                          value={form.prefixo_comum}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              prefixo_comum: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div>
                        <Label>Prefixo prioridade</Label>
                        <Input
                          value={form.prefixo_prioridade}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              prefixo_prioridade: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  <Button className="cursor-pointer" variant="ghost" onClick={prev}>
                    ← Voltar
                  </Button>

                  <Button className="cursor-pointer" onClick={next}>
                    Continuar →
                  </Button>
                </div>
              </>
            )}

            {/* STEP 3 - URL */}
            {step === 3 && (
              <>
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold">
                    🌐 Endereço da fila
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    Esse será o link que seus clientes usarão
                  </p>
                </div>

                <div className="flex items-center border rounded-md overflow-hidden">
                  <input
                    className="flex-1 px-3 py-2 outline-none text-sm"
                    value={form.endereco}
                    onChange={(e) =>
                      handleChange("endereco", e.target.value)
                    }
                  />
                </div> 

                <p className="text-xs text-muted-foreground">
                  Preview: {link}
                </p>

                <div className="flex justify-between">
                  <Button className="cursor-pointer" variant="ghost" onClick={prev}>
                    ← Voltar
                  </Button>

                  <Button className="cursor-pointer" onClick={next}>
                    Continuar →
                  </Button>
                </div>
              </>
            )}

            {/* STEP 4 - RESUMO */}
            {step === 4 && (
              <>
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold">
                    🎉 Revisão final
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    Confirme antes de criar sua fila
                  </p>
                </div>

                <div className="bg-muted p-3 rounded text-sm space-y-1">
                  <p><strong>Nome:</strong> {form.nome}</p>
                  <p><strong>Tipo:</strong> {form.tipo}</p>
                   {form.tipo === "Preferencial" && (
                        <div className="ml-4 space-y-1 text-xs text-muted-foreground">
                            <p>
                                <strong className="text-sm text-foreground">
                                Nome do preferencial:
                                </strong>{" "}
                                {form.nome_prioridade}
                            </p>

                            <p>
                                <strong className="text-sm text-foreground">
                                Prefixo comum:
                                </strong>{" "}
                                {form.prefixo_comum}
                            </p>

                            <p>
                                <strong className="text-sm text-foreground">
                                Prefixo prioridade:
                                </strong>{" "}
                                {form.prefixo_prioridade}
                            </p>
                        </div>
                    )}
                  <p><strong>URL:</strong> {link}</p>
                </div>

                <div className="flex justify-between">
                  <Button className="cursor-pointer" variant="ghost" onClick={prev}>
                    ← Voltar
                  </Button>

                  <Button className="cursor-pointer" onClick={onClickCadastrarFila}>
                    Criar fila 🚀
                  </Button>
                </div>
              </>
            )}

          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          Você poderá alterar tudo depois nas configurações
        </p>
      </div>
    </div>
  );
}