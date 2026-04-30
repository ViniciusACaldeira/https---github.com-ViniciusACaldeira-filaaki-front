import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function Configuracao( )
{
    return (
        <>
            <h1 className="mb-6 text-2xl font-bold text-foreground">Configurações</h1>
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                    <CardTitle>Configurações da Fila</CardTitle>
                    <CardDescription>Ajuste as preferências da fila de atendimento</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                        <Label htmlFor="prefixo">Prefixo da Senha</Label>
                        <Input id="prefixo" defaultValue="A" />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="limite">Limite de Clientes</Label>
                        <Input id="limite" type="number" defaultValue="100" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="mensagem">Mensagem de Boas-vindas</Label>
                        <Input id="mensagem" defaultValue="Bem-vindo! Você entrou na fila." />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                        <Label>Solicitar nome do cliente</Label>
                        <p className="text-sm text-muted-foreground">Pedir nome ao entrar na fila</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                        <Label>Solicitar telefone do cliente</Label>
                        <p className="text-sm text-muted-foreground">Pedir telefone ao entrar na fila</p>
                        </div>
                        <Switch />
                    </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}