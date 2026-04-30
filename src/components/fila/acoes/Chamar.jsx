import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { chamarProximo } from "@/services/api";

export default function Chamar( {fila} )
{
    function cProximo( )
    {
        chamarProximo( fila ).then(() => {
            alert("Próximo chamado!");
        }).catch(() => {
            alert("Erro ao chamar próximo!");
        });
    }

    return (
        <Button className="gap-2" onClick={cProximo}>
            <Play size={16} /> Chamar
        </Button>
    );
}