import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useRef } from "react";
import { useFila } from "@/context/FilaProvider";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "../../../config/env";

export default function QrFila() {
  const { fila } = useFila();
console.log("FILA ATUAL:", fila);
  useEffect(() => {
    console.log("Fila mudou:", fila);
  }, [fila]);

  const qrRef = useRef(null);

  if (!fila) return null;

  let url = `${ BASE_URL }/c/${fila}`;

  const downloadQr = () => {
    const canvas = qrRef.current.querySelector("canvas");

    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = `qr-fila-${fila}.png`;
    link.click();
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm text-muted-foreground">QR Code da fila</p>

      <div ref={qrRef}>
        <QRCodeCanvas
          key={fila.codigo}
          value={url}
          size={128}
        />
      </div>

      <p className="text-sm text-muted-foreground">{url}</p>

      <Button variant="outline" className="w-full" onClick={downloadQr}>
        Baixar QR Code
      </Button>
    </div>
  );
}