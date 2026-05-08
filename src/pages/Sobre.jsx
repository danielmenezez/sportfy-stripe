import PageLayout from "../components/PageLayout"

export default function Sobre() {
  return (
    <PageLayout>
      <div className="placeholder-hero">
        <span className="section-label">Empresa</span>
        <h1>Sobre nós</h1>
        <p>
          A SportFY nasceu da paixão pelo esporte e pela crença de que equipamentos de alta performance devem ser acessíveis a todos os atletas — do iniciante ao profissional.
        </p>
      </div>

      <div className="placeholder-content">
        <div className="placeholder-block">
          <h2>Nossa missão</h2>
          <p>
            Oferecer produtos esportivos de qualidade premium com atendimento próximo e entrega rápida. Acreditamos que o esporte transforma vidas e queremos fazer parte dessa transformação.
          </p>
        </div>
        <div className="placeholder-block">
          <h2>Nossa história</h2>
          <p>
            Fundada em 2020, a SportFY começou como uma loja online especializada em roupas para corrida e cresceu para uma plataforma completa de equipamentos esportivos, servindo mais de 12 mil clientes em todo o Brasil.
          </p>
        </div>
      </div>
    </PageLayout>
  )
}
