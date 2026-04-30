import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Scissors, Stethoscope, Sparkles, Building2 } from "lucide-react";
import { cadastrarEmpresa } from "../../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [erro, setErro] = useState("");

  const [form, setForm] = useState({
    nome: "",
    slug: "",
    segmento: "none",
    telefone: "",
    admin_nome: "",
    admin_email: "",
    admin_senha: "",
    admin_senha_confirmar: "",
  });

  // 🔹 slug
  const generateSlug = (text) =>
    text
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const isValidSlug = (slug) =>
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);

  // 🔹 telefone
  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, "");

    if (numbers.length <= 10) {
      return numbers
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .slice(0, 14);
    }

    return numbers
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 15);
  };

  const handleChange = (field, value) => {
    if (field === "nome") {
      setForm((prev) => ({
        ...prev,
        nome: value,
        slug: generateSlug(value),
      }));
    } else {
      setForm((prev) => ({ ...prev, [field]: value }));
    }
  };

  const nextStep = () => {
    setErro("");

    if (!form.nome || !form.slug) {
      setErro("Preencha os dados da empresa");
      return;
    }

    if (!isValidSlug(form.slug)) {
      setErro("Slug inválido");
      return;
    }

    setStep(2);
  };

  const prevStep = () => setStep(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    if (
      !form.admin_nome ||
      !form.admin_email ||
      !form.admin_senha ||
      !form.admin_senha_confirmar
    ) {
      setErro("Preencha os dados do administrador");
      return;
    }

    if (form.admin_senha !== form.admin_senha_confirmar) {
      setErro("As senhas não coincidem");
      return;
    }

    try 
    {
      await cadastrarEmpresa({...form, segmento: form.segmento === "none" ? null : form.segmento, telefone: form.telefone.replace(/\D/g, "") });
      navigate("/login");
    } 
    catch (error)
    {
      setErro(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Criar conta no FilaAki
          </CardTitle>
        </CardHeader>

        <CardContent>
          {/* STEPS */}
          <div className="mb-6 space-y-2">
            <div className="flex justify-between text-sm">
              <button
                type="button"
                onClick={() => setStep(1)}
                className={`cursor-pointer transition-all hover:underline ${
                  step === 1 ? "text-primary font-medium" : ""
                }`}
              >
                1. Empresa
              </button>

              <button
                type="button"
                onClick={() => nextStep()}
                className={`cursor-pointer transition-all hover:underline ${
                  step === 2 ? "text-primary font-medium" : "opacity-50"
                }`}
              >
                2. Admin
              </button>
            </div>

            <Progress value={step === 1 ? 50 : 100} />

            <p className="text-xs text-muted-foreground text-center">
              {step === 1
                ? "Informe os dados da empresa"
                : "Crie o usuário administrador"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {erro && (
              <p className="text-sm text-red-500 text-center">{erro}</p>
            )}

            {/* STEP 1 */}
            {step === 1 && (
              <>
                <h3 className="font-semibold flex items-center gap-2">
                  <Badge>Empresa</Badge>
                  Informações básicas
                </h3>

                <div className="space-y-2">
                  <Label>Nome da empresa</Label>
                  <Input
                    value={form.nome}
                    onChange={(e) =>
                      handleChange("nome", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Slug</Label>
                  <Input
                    value={form.slug}
                    readOnly
                    className="bg-muted cursor-not-allowed"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Segmento (opcional)</Label>
                    <Select
                      value={form.segmento}
                      onValueChange={(value) =>
                        handleChange("segmento", value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecionar" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="none">Nenhum</SelectItem>

                        <SelectItem value="barbearia">
                          <div className="flex items-center gap-2">
                            <Scissors size={16} /> Barbearia
                          </div>
                        </SelectItem>

                        <SelectItem value="clinica">
                          <div className="flex items-center gap-2">
                            <Stethoscope size={16} /> Clínica
                          </div>
                        </SelectItem>

                        <SelectItem value="estetica">
                          <div className="flex items-center gap-2">
                            <Sparkles size={16} /> Estética
                          </div>
                        </SelectItem>

                        <SelectItem value="outro">
                          <div className="flex items-center gap-2">
                            <Building2 size={16} /> Outro
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Telefone (opcional)</Label>
                    <Input
                      value={form.telefone}
                      onChange={(e) =>
                        handleChange(
                          "telefone",
                          formatPhone(e.target.value)
                        )
                      }
                    />
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={nextStep}
                  className="w-full cursor-pointer"
                >
                  Continuar →
                </Button>
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <>
                <h3 className="font-semibold flex items-center gap-2">
                  <Badge>Admin</Badge>
                  Usuário principal
                </h3>

                <div className="space-y-2">
                  <Label>Nome</Label>
                  <Input
                    value={form.admin_nome}
                    onChange={(e) =>
                      handleChange("admin_nome", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={form.admin_email}
                    onChange={(e) =>
                      handleChange("admin_email", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Senha</Label>
                  <Input
                    type="password"
                    value={form.admin_senha}
                    onChange={(e) =>
                      handleChange("admin_senha", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Confirmar senha</Label>
                  <Input
                    type="password"
                    value={form.admin_senha_confirmar}
                    onChange={(e) =>
                      handleChange(
                        "admin_senha_confirmar",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="cursor-pointer text-sm text-muted-foreground hover:text-primary"
                  >
                    ← Voltar
                  </button>

                  <Button type="submit" className="cursor-pointer">
                    Finalizar cadastro
                  </Button>
                </div>
              </>
            )}

            <div className="text-center text-sm text-muted-foreground">
              Já tem conta?{" "}
              <span
                className="text-primary cursor-pointer hover:underline"
                onClick={() => navigate("/login")}
              >
                Entrar
              </span>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}