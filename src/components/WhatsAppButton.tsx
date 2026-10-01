import { useEffect, useState } from "react";

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Aparece suavemente após 1 segundo para não poluir o carregamento inicial
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="relative flex items-center justify-center group">
        {/* Animação pulsante decorativa para chamar atenção (apenas atrás do botão) */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping duration-[2500ms]"></span>
        
        {/* Balão com mensagem de CTA (apenas visível no hover no desktop) */}
        <div className="absolute right-full mr-4 hidden w-max items-center rounded-[8px] bg-white px-4 py-2 text-sm font-bold text-foreground shadow-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:flex">
          Fale conosco!
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 border-y-8 border-l-8 border-y-transparent border-l-white"></div>
        </div>

        {/* Botão Principal Linkando p/ API do WhatsApp */}
        <a
          href="https://wa.me/5508001236565"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Fale conosco pelo WhatsApp"
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-[#1DA851] hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
          title="Fale conosco pelo WhatsApp"
        >
          {/* Logo do WhatsApp Oficial (SVG Inline) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-8 w-8 fill-current drop-shadow-sm"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default WhatsAppButton;
