import { Button } from "@/components/ui/button";
import { Pause } from "lucide-react";

export default function Pausar( )
{
    return ( 
        <Button variant="secondary" className="gap-2">
            <Pause size={16} /> Pausar
        </Button> );
}