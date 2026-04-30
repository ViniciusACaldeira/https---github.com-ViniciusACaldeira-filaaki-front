import { useState } from "react";
import Atualizar from "./acoes/Atualizar";
import Chamar from "./acoes/Chamar";
import Pausar from "./acoes/Pausar";
import BotaoPausar from "./acoes/Pausar";
import SelectFila from "./acoes/SelectFila";
import { useFila } from "@/context/FilaProvider";

export default function Acoes( )
{
    const { fila } = useFila( );

    return (
        <>
            <SelectFila />

            <Chamar fila={fila} />
            <Pausar fila={fila} />
            <Atualizar fila={fila} />
        </>
    )
}






