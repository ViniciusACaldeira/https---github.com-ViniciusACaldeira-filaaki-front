import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

import { useAuth } from "../../../context/AuthProvider";
import { BASE_URL } from "../../../config/env";
import { cadastrarFila } from "../../../services/api";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function NovaFila() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        nome: "",
        tipo: "Comum",
        endereco: "",
        slug: "",
        prefixo_comum: "A",
        prefixo_prioridade: "P",
        nome_prioridade: "Preferencial",
    });

    const generateSlug = (text) =>
        text
            .normalize("NFD")
            .replace(/\p{Diacritic}/gu, "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

    const handleChange = (field, value) => {
        if (field === "endereco") {
            setForm((prev) => ({
                ...prev,
                endereco: value,
                slug: generateSlug(value),
            }));

            return;
        }

        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const onChangeTipo = (tipo) => {
        setForm((prev) => ({
            ...prev,
            tipo,
            ...(tipo === "Comum" && {
                prefixo_comum: "A",
                prefixo_prioridade: "P",
                nome_prioridade: "Preferencial",
            }),
        }));
    };

    const link = `${BASE_URL}/c/${user?.slug}/${form.slug}`;

    const onSubmit = async () => {
        try {
            setLoading(true);

            await cadastrarFila(form);

            toast.success("Fila criada com sucesso!");

            navigate("/d/fila");
        }
        catch (error) {
            console.log(error);

            toast.error(
                "Falha ao criar fila. Tente novamente."
            );
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <div className="max-w-3xl mx-auto space-y-6">

                {/* HEADER */}
                <div>
                    <h1 className="text-2xl font-bold">
                        Nova fila
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Configure uma nova fila de atendimento
                    </p>
                </div>

                <Card>
                    <CardContent className="p-6 space-y-6">

                        {/* NOME */}
                        <div className="space-y-2">
                            <Label>
                                Nome da fila
                            </Label>

                            <Input
                                placeholder="Ex: Atendimento rápido"
                                value={form.nome}
                                onChange={(e) => {
                                    setForm({
                                        ...form,
                                        nome: e.target.value,
                                        endereco: e.target.value,
                                        slug: generateSlug(
                                            e.target.value
                                        ),
                                    });
                                }}
                            />
                        </div>

                        <Separator />

                        {/* TIPO */}
                        <div className="space-y-3">
                            <div>
                                <Label>
                                    Tipo de atendimento
                                </Label>

                                <p className="text-sm text-muted-foreground">
                                    Escolha como sua fila funcionará
                                </p>
                            </div>

                            <RadioGroup
                                value={form.tipo}
                                onValueChange={onChangeTipo}
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
                        </div>

                        {/* PREFERENCIAL */}
                        {form.tipo === "Preferencial" && (
                            <div className="space-y-4">

                                <div>
                                    <Label>
                                        Nome do preferencial
                                    </Label>

                                    <Input
                                        value={form.nome_prioridade}
                                        onChange={(e) =>
                                            handleChange(
                                                "nome_prioridade",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">

                                    <div>
                                        <Label>
                                            Prefixo comum
                                        </Label>

                                        <Input
                                            value={form.prefixo_comum}
                                            onChange={(e) =>
                                                handleChange(
                                                    "prefixo_comum",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>

                                    <div>
                                        <Label>
                                            Prefixo prioridade
                                        </Label>

                                        <Input
                                            value={form.prefixo_prioridade}
                                            onChange={(e) =>
                                                handleChange(
                                                    "prefixo_prioridade",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>

                                </div>
                            </div>
                        )}

                        <Separator />

                        {/* URL */}
                        <div className="space-y-2">
                            <div>
                                <Label>
                                    Endereço da fila
                                </Label>

                                <p className="text-sm text-muted-foreground">
                                    Esse será o link público da fila
                                </p>
                            </div>

                            <Input
                                value={form.endereco}
                                onChange={(e) =>
                                    handleChange(
                                        "endereco",
                                        e.target.value
                                    )
                                }
                            />

                            <div className="bg-muted rounded-md p-3 text-sm">
                                <span className="font-medium">
                                    Preview:
                                </span>

                                <p className="text-muted-foreground break-all">
                                    {link}
                                </p>
                            </div>
                        </div>

                        <Separator />

                        {/* RESUMO */}
                        <div className="space-y-2">
                            <h2 className="font-semibold">
                                Resumo
                            </h2>

                            <div className="bg-muted rounded-md p-4 text-sm space-y-1">
                                <p>
                                    <strong>Nome:</strong>{" "}
                                    {form.nome || "-"}
                                </p>

                                <p>
                                    <strong>Tipo:</strong>{" "}
                                    {form.tipo}
                                </p>

                                <p>
                                    <strong>URL:</strong>{" "}
                                    {link}
                                </p>
                            </div>
                        </div>

                        {/* ACTIONS */}
                        <div className="flex justify-end gap-2">

                            <Button
                                variant="outline"
                                className="cursor-pointer"
                                onClick={() =>
                                    navigate("/d/fila")
                                }
                            >
                                Cancelar
                            </Button>

                            <Button
                                className="cursor-pointer"
                                disabled={loading}
                                onClick={onSubmit}
                            >
                                {loading
                                    ? "Criando..."
                                    : "Criar fila"}
                            </Button>

                        </div>

                    </CardContent>
                </Card>

            </div>
        </div>
    );
}