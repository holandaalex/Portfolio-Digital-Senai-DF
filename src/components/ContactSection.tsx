import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import contatoBg from "@/assets/hero/contato.jpg";

const ContactSection = () => {
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

        <form className="form-premium-senai" onSubmit={(e) => e.preventDefault()}>
          <Input placeholder="Nome Completo" className="form-field-senai" />
          <Input
            type="email"
            placeholder="E-mail"
            className="form-field-senai"
          />
          <Input
            type="tel"
            placeholder="Telefone"
            className="form-field-senai"
          />
          <Textarea placeholder="Como podemos ajudar?" className="textarea-senai" />
          <button type="submit" className="btn-senai-accent w-full mt-2">
            Enviar Mensagem
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
