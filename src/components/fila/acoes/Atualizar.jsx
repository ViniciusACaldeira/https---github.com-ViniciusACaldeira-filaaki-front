import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";

export default function Atualizar( )
{
    return ( 
        <Button variant="outline" className="gap-2">
            <RotateCw size={16} /> Atualizar
        </Button>
    );
}