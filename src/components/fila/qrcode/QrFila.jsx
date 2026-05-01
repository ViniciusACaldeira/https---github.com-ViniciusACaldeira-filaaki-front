import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useRef, useState } from "react";
import { useFila } from "@/context/FilaProvider";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "../../../config/env";
import { useAuth } from "../../../context/AuthProvider";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

export default function QrFila() {
  const { fila } = useFila();
  const { user } = useAuth( );

  const [copied, setCopied] = useState(false);

  async function handleCopy( )
  {
      try 
      {
          const text = url;

          if (!text)
            return;

          if (navigator?.clipboard?.writeText) {
              await navigator.clipboard.writeText(text);
          } 
          else 
          {
              const textarea = document.createElement("textarea");
              textarea.value = text;
              textarea.style.position = "fixed";
              textarea.style.opacity = "0";
              document.body.appendChild(textarea);

              textarea.focus();
              textarea.select();

              document.execCommand("copy");

              document.body.removeChild(textarea);
          }

          setCopied(true);
          setTimeout(() => setCopied(false), 1200);

      } catch (err) {
          console.error("Erro ao copiar:", err);
      }
  }

  function truncate(text, size = 35) {
      if (!text) return "";
      return text.length > size ? text.slice(0, size) + "..." : text;
  }
  
  useEffect(() => {
  }, [fila]);

  const qrRef = useRef(null);

  if (!fila) return null;

  let url = `${ BASE_URL }/c/${user?.slug}/${fila.slug}`;

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

      <Tooltip>
          <TooltipTrigger asChild>
              <button
                  onClick={handleCopy}
                  className="
                      text-xs text-gray-600
                      max-w-[250px]
                      truncate
                      hover:text-black
                      transition
                  "
              >
                  {truncate(url)}
              </button>
          </TooltipTrigger>

          <TooltipContent>
              <p>
                  {copied ? "Link copiado!" : "Clique para copiar"}
              </p>
          </TooltipContent>
      </Tooltip>

      <Button variant="outline" className="w-full" onClick={downloadQr}>
        Baixar QR Code
      </Button>
    </div>
  );
}