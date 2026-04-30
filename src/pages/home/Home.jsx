import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const logos = ["FilaAki","Clínica Vida","Estética Bella","OdontoPrime","Atendimento+"];

function Metrics() {
  const [empresas, setEmpresas] = useState(0);
  const [atendimentos, setAtendimentos] = useState(0);
  const [reducao, setReducao] = useState(0);

  useEffect(() => {
    let e = 0, a = 0, r = 0;

    const interval = setInterval(() => {
      if (e < 100) e += 2;
      if (a < 5000) a += 100;
      if (r < 40) r += 1;

      setEmpresas(e);
      setAtendimentos(a);
      setReducao(r);

      if (e >= 100 && a >= 5000 && r >= 40) {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 border-y text-center">
      <div className="flex justify-center gap-12 flex-wrap">
        <div>
          <p className="text-3xl font-bold">+{empresas}</p>
          <p className="text-sm text-muted-foreground">empresas usando</p>
        </div>
        <div>
          <p className="text-3xl font-bold">+{atendimentos.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">atendimentos/mês</p>
        </div>
        <div>
          <p className="text-3xl font-bold">-{reducao}%</p>
          <p className="text-sm text-muted-foreground">tempo de espera</p>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % logos.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <section className="text-center py-24 px-6">
        <Badge className="mb-4">Gestão de Filas Inteligente</Badge>

        <h1 className="text-5xl font-bold mb-6 leading-tight">
          Organize atendimentos
          <br />
          <span className="text-primary">sem caos e sem filas físicas</span>
        </h1>

        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          Plataforma completa para gerenciar filas em tempo real, reduzir espera
          e melhorar a experiência do cliente em qualquer tipo de serviço.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Button size="lg" onClick={() => navigate("/registrar")}>
            Começar agora
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate("/login")}>
            Já sou cliente
          </Button>
        </div>
      </section>

      {/* MÉTRICAS */}
      <Metrics />

      {/* LOGOS */}
      <section className="py-16">
        <h2 className="text-center text-xl mb-8 font-medium">
          Empresas que já utilizam o FilaAki
        </h2>

        <div className="flex justify-center items-center gap-6 flex-wrap">
          {logos.map((logo, index) => (
            <div
              key={index}
              className={`px-4 py-2 rounded-xl border text-sm transition-all duration-500 ${
                index === current ? "opacity-100 scale-110 bg-primary text-white" : "opacity-40"
              }`}
            >
              {logo}
            </div>
          ))}
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl text-center font-bold mb-12">
          Como funciona
        </h2>

        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <h3 className="font-semibold mb-2">1. Crie sua fila</h3>
            <p className="text-sm text-muted-foreground">
              Configure rapidamente sua fila em poucos cliques.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">2. Clientes entram</h3>
            <p className="text-sm text-muted-foreground">
              Clientes entram na fila pelo celular ou presencialmente.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">3. Gerencie tudo</h3>
            <p className="text-sm text-muted-foreground">
              Chame, organize e acompanhe em tempo real.
            </p>
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          <Card><CardContent className="p-6"><h3 className="font-semibold text-lg mb-2">Tempo real</h3><p className="text-sm text-muted-foreground">Fila atualizada instantaneamente.</p></CardContent></Card>
          <Card><CardContent className="p-6"><h3 className="font-semibold text-lg mb-2">Menos espera</h3><p className="text-sm text-muted-foreground">Clientes não precisam aguardar no local.</p></CardContent></Card>
          <Card><CardContent className="p-6"><h3 className="font-semibold text-lg mb-2">Escalável</h3><p className="text-sm text-muted-foreground">Funciona para qualquer tipo de negócio.</p></CardContent></Card>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="py-20 px-6 bg-muted/30">
        <h2 className="text-3xl text-center font-bold mb-12">
          O que estão dizendo
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card><CardContent className="p-6"><p className="text-sm">"Organizou totalmente meu atendimento."</p><p className="mt-4 text-xs text-muted-foreground">— João, Barbearia</p></CardContent></Card>
          <Card><CardContent className="p-6"><p className="text-sm">"Reduzi filas na clínica."</p><p className="mt-4 text-xs text-muted-foreground">— Maria, Clínica</p></CardContent></Card>
          <Card><CardContent className="p-6"><p className="text-sm">"Muito simples e eficiente."</p><p className="mt-4 text-xs text-muted-foreground">— Ana, Estética</p></CardContent></Card>
        </div>
      </section>

      {/* PLANOS */}
      <section className="py-20 px-6">
        <h2 className="text-3xl text-center font-bold mb-12">
          Planos
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card><CardContent className="p-6"><h3 className="text-xl font-semibold mb-4">Grátis</h3><p className="text-3xl font-bold mb-6">R$0</p><ul className="text-sm text-muted-foreground space-y-2 mb-6"><li>✔ 1 fila</li><li>✔ 20 atendimentos</li></ul><Button className="w-full" variant="outline">Começar</Button></CardContent></Card>
          <Card className="border-primary"><CardContent className="p-6"><Badge className="mb-2">Mais usado</Badge><h3 className="text-xl font-semibold mb-4">Pro</h3><p className="text-3xl font-bold mb-6">R$49/mês</p><ul className="text-sm space-y-2 mb-6"><li>✔ Ilimitado</li><li>✔ Relatórios</li></ul><Button className="w-full">Assinar</Button></CardContent></Card>
          <Card><CardContent className="p-6"><h3 className="text-xl font-semibold mb-4">Empresarial</h3><p className="text-3xl font-bold mb-6">Sob consulta</p><ul className="text-sm text-muted-foreground space-y-2 mb-6"><li>✔ Multi unidades</li></ul><Button className="w-full" variant="outline">Contato</Button></CardContent></Card>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="text-center py-20">
        <h2 className="text-3xl font-bold mb-4">
          Comece agora gratuitamente
        </h2>
        <p className="text-muted-foreground mb-6">
          Sem cartão de crédito
        </p>
        <Button size="lg" onClick={() => navigate("/registrar")}>
          Criar conta grátis
        </Button>
      </section>

      <footer className="text-center py-10 text-muted-foreground">
        © 2026 FilaAki
      </footer>
    </div>
  );
}
