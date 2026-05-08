import PageLayout from "../components/PageLayout"

export default function AjudaTrocas() {
  return (
    <PageLayout>
      <div className="placeholder-hero">
        <span className="section-label">Suporte</span>
        <h1>Trocas e devoluções</h1>
        <p>
          Nossa política garante 30 dias para troca ou devolução de qualquer produto sem burocracia.
        </p>
      </div>

      <div className="placeholder-content">
        <div className="placeholder-block">
          <h2>Como funciona</h2>
          <p>
            1. Entre em contato pelo e-mail <strong>suporte@sportfy.com.br</strong> informando o número do pedido e o motivo da troca.<br /><br />
            2. Nosso time responde em até 24 horas úteis com as instruções de envio.<br /><br />
            3. Após recebermos o produto, processamos a troca ou estorno em até 5 dias úteis.
          </p>
        </div>
        <div className="placeholder-block placeholder-block--highlight">
          <h2>Condições</h2>
          <p>
            Produtos devem estar sem uso, com etiqueta original e na embalagem original. O prazo de 30 dias conta a partir da data de entrega.
          </p>
        </div>
      </div>
    </PageLayout>
  )
}
