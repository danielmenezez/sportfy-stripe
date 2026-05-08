import PageLayout from "../components/PageLayout"

export default function Carreiras() {
  return (
    <PageLayout>
      <div className="placeholder-hero">
        <span className="section-label">Empresa</span>
        <h1>Carreiras</h1>
        <p>
          Faça parte do time SportFY. Buscamos pessoas apaixonadas por esporte, tecnologia e experiência do cliente.
        </p>
      </div>

      <div className="placeholder-content">
        <div className="placeholder-block placeholder-block--highlight">
          <h2>Vagas abertas</h2>
          <p>
            No momento não há vagas abertas, mas você pode enviar seu currículo para <strong>carreiras@sportfy.com.br</strong> e entraremos em contato quando surgir uma oportunidade alinhada ao seu perfil.
          </p>
        </div>
        <div className="placeholder-block">
          <h2>Por que trabalhar na SportFY?</h2>
          <p>
            Ambiente descontraído, benefícios flexíveis, home office parcial e desconto exclusivo em produtos da loja para todos os colaboradores.
          </p>
        </div>
      </div>
    </PageLayout>
  )
}
