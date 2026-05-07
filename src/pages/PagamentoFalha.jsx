import { useSearchParams, Link } from "react-router-dom"

export default function PagamentoFalha() {
  const [params] = useSearchParams()
  const externalRef = params.get("external_reference")

  return (
    <div className="payment-page payment-page--falha">
      <div className="payment-page-card">
        <div className="payment-page-icon payment-page-icon--falha">✕</div>
        <h1 className="payment-page-title">Pagamento não aprovado</h1>
        <p className="payment-page-description">
          Houve um problema ao processar seu pagamento. Verifique os dados do cartão ou tente outro método de pagamento.
        </p>

        {externalRef && (
          <div className="payment-page-info">
            <div className="payment-info-row">
              <span>Referência</span>
              <strong>{externalRef}</strong>
            </div>
          </div>
        )}

        <div className="payment-page-actions">
          <Link to="/" className="payment-btn payment-btn--primary">
            Tentar novamente
          </Link>
          <Link to="/" className="payment-btn payment-btn--ghost">
            Voltar para a loja
          </Link>
        </div>
      </div>
    </div>
  )
}
