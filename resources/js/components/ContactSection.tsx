import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import contatoBg from "@/assets/hero/contato.jpg";
import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const response = await fetch("https://formsubmit.co/ajax/contato@alexholanda.com.br", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ 
          ...formData, 
          _subject: "Novo Contato Geral - Portal SENAI",
          _template: "table"
        }),
      });

      const data = await response.json();
      if (data.success) {
        setIsSuccess(true);
        setFormData({ nome: "", email: "", telefone: "", mensagem: "" });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        setErrorMsg(data.error || "Erro ao enviar. Tente novamente.");
      }
    } catch (err) {
      setErrorMsg("Erro de conexão. Verifique sua internet.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section
      id="contato"
      className="contact-parallax relative overflow-hidden"
      style={{ backgroundImage: `url(${contatoBg})` }}
    >
      <div className="contact-overlay absolute inset-0" />
      <div className="section-container relative grid gap-8 py-12 md:grid-cols-[1fr_0.9fr] md:items-center md:gap-10 md:py-16">
        <div className="max-w-[430px] text-primary-foreground">
          <p className="mb-2 text-sm uppercase">Precisa de ajuda?</p>
          <h2 className="mb-4 text-[2.25rem] font-black uppercase leading-none sm:text-[2.6rem] md:mb-5 md:text-[3rem]">
            Entre em contato
          </h2>
          <p className="mb-6 text-[13px] leading-6 text-primary-foreground/88">
            Nossa equipe está pronta para esclarecer dúvidas sobre turmas,
            valores e documentação. Fale com a FIBRA e avance na sua formação
            profissional.
          </p>
          <p className="text-[12px] leading-5 text-primary-foreground/80">
            Preencha o formulário e nossa equipe entrará em contato para
            orientar sua inscrição.
          </p>
        </div>

        <form className="form-premium-senai" onSubmit={handleSubmit}>
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-8 text-center text-white">
              <CheckCircle2 className="mb-4 h-12 w-12 text-green-400" />
              <h3 className="text-xl font-bold">Mensagem Enviada!</h3>
              <p className="mt-2 text-sm text-white/80">Obrigado pelo contato. Retornaremos em breve.</p>
            </div>
          ) : (
            <>
              {errorMsg && <p className="text-center text-sm font-bold text-red-400">{errorMsg}</p>}
              <Input 
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Nome Completo" 
                required
                className="form-field-senai" 
              />
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="E-mail"
                required
                className="form-field-senai"
              />
              <Input
                type="tel"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                placeholder="Telefone"
                required
                className="form-field-senai"
              />
              <Textarea 
                name="mensagem"
                value={formData.mensagem}
                onChange={handleChange}
                placeholder="Como podemos ajudar?" 
                required
                className="textarea-senai" 
              />
              <button disabled={isSubmitting} type="submit" className="btn-senai-accent w-full mt-2 flex items-center justify-center gap-2">
                {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : "Enviar Mensagem"}
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
