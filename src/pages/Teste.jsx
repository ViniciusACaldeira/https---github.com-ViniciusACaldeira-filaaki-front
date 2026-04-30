import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function Teste() {
  return (
    <div className="p-20">
      <Select defaultValue="1">
        <SelectTrigger className="w-[200px]">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="1">Teste 1</SelectItem>
          <SelectItem value="2">Teste 2</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}