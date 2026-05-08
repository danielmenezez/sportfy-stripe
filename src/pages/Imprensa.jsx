import PageLayout from "../components/PageLayout"

export default function Imprensa() {
  return (
    <PageLayout>
      <div className="placeholder-hero">
        <span className="section-label">Empresa</span>
        <h1>Imprensa</h1>
        <p>
          Para solicitações de mídia, entrevistas e informações institucionais sobre a SportFY.
        </p>
      </div>

      <div className="placeholder-content">
        <div className="placeholder-block">
          <h2>Contato de imprensa</h2>
          <p>
            Para jornalistas e veículos de comunicação, entre em contato com nossa assessoria de imprensa pelo e-mail <strong>imprensa@sportfy.com.br</strong> ou pelo telefone (11) 3000-0000.
          </p>
        </div>
        <div className="placeholder-block">
          <h2>Kit de mídia</h2>
          <p>
            Logotipos, fotos institucionais e informações sobre a empresa estão disponíveis mediante solicitação.
          </p>
        </div>
      </div>
    </PageLayout>
  )
}
