import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import { getFilas } from "../../../services/api";
import { useEffect, useState } from "react";
import { useFila } from "@/context/FilaProvider";

export default function SelectFila( )
{
    const { fila, setFila } = useFila( );
    const [ filas, setFilas ] = useState([]);

    useEffect( ( ) => {
        getFilas( ).then((data) => {
            if( data.length > 0 )
            {
                setFilas( data );
                setFila( data[0] );
            }
        });
    }, [] );

    function onChangeFila( value )
    {
        const filaSelecionada = filas.find(f => f.codigo === value);
        setFila(filaSelecionada);
    }

    return (
        <Select value={fila?.codigo} onValueChange={onChangeFila}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione a fila" />
            </SelectTrigger>
            <SelectContent position="popper">
                <SelectGroup>
                    {filas.map((fila, i) => (
                        <SelectItem key={fila.id} value={fila.codigo}>
                            {fila.nome}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}