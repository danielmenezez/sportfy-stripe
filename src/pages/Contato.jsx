import { useState } from "react"
import PageLayout from "../components/PageLayout"

export default function Contato() {
  const [enviado, setEnviado] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setEnviado(true)
    e.target.reset()
  }

  return (
    <PageLayout>
      <div className="placeholder-hero">
        <span className="section-label">Suporte</span>
        <h1>Fale conosco</h1>
        <p>
          Tem alguma dúvida ou sugestão? Nossa equipe responde em até 24 horas úteis.
        </p>
      </div>

      <div className="placeholder-content">
        <div className="placeholder-block">
          {enviado ? (
            <div className="contato-sucesso">
              <div className="contato-sucesso-icon">✓</div>
              <h2>Mensagem enviada!</h2>
              <p>Entraremos em contato em breve.</p>
              <button
                className="rastrear-btn"
                onClick={() => setEnviado(false)}
                style={{ marginTop: "16px" }}
              >
                Enviar outra mensagem
              </button>
            </div>
          ) : (
            <form className="contato-form" onSubmit={handleSubmit}>
              <div className="contato-field">
                <label htmlFor="nome">Nome</label>
                <input id="nome" type="text" placeholder="Seu nome completo" required />
              </div>
              <div className="contato-field">
                <label htmlFor="email">E-mail</label>
                <input id="email" type="email" placeholder="seu@email.com" required />
              </div>
              <div className="contato-field">
                <label htmlFor="assunto">Assunto</label>
                <input id="assunto" type="text" placeholder="Ex: Dúvida sobre troca" required />
              </div>
              <div className="contato-field">
                <label htmlFor="mensagem">Mensagem</label>
                <textarea id="mensagem" rows={5} placeholder="Descreva sua dúvida ou sugestão..." required />
              </div>
              <button type="submit" className="rastrear-btn">
                Enviar mensagem
              </button>
            </form>
          )}
        </div>

        <div className="placeholder-block placeholder-block--highlight">
          <h2>Outros canais</h2>
          <p>
            <strong>E-mail:</strong> suporte@sportfy.com.br<br />
            <strong>Telefone:</strong> (11) 3000-0000<br />
            <strong>Horário:</strong> Seg–Sex, 9h às 18h
          </p>
        </div>
      </div>
    </PageLayout>
  )
}
