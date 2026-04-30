import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Relatorio( )
{
    const data = {};
    console.log("Dados do relatório:", data);
    
    return(
        <>
            <h1 className="mb-6 text-2xl font-bold text-foreground">Relatórios</h1>
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                    <CardTitle>Resumo do Dia</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Total de atendimentos</span>
                        <span className="font-semibold">{data?.atendimentosHoje ?? 0}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Tempo médio de espera</span>
                        <span className="font-semibold">{data?.tempoMedioEspera ?? 0} min</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Clientes na fila agora</span>
                        <span className="font-semibold">{data?.totalNaFila ?? 0}</span>
                    </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                    <CardTitle>Status da Fila</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Fila atual</span>
                        <span className="font-semibold">{data?.filaNome ?? "Balcão 01"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Senha atual</span>
                        <span className="font-semibold">{data?.senhaAtual || "---"}</span>
                    </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}