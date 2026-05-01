import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { chamarProximo } from "@/services/api";
import { toast } from "sonner";

export default function Chamar( {fila} )
{
    function cProximo( )
    {
        chamarProximo( fila ).then(() => {
            toast.success("Próximo chamado!");
        }).catch(( e ) => {
            toast.error( e.erro ?? "Erro ao chamar próximo!");
        });
    }

    return (
        <Button className="gap-2" onClick={cProximo}>
            <Play size={16} /> Chamar
        </Button>
    );
}