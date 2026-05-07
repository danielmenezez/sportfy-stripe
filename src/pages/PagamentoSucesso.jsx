import { useSearchParams, Link } from "react-router-dom"

export default function PagamentoSucesso() {
  const [params] = useSearchParams()
  const paymentId = params.get("payment_id") || params.get("collection_id")
  const externalRef = params.get("external_reference")

  return (
    <div className="payment-page payment-page--sucesso">
      <div className="payment-page-card">
        <div className="payment-page-icon payment-page-icon--sucesso">✓</div>
        <h1 className="payment-page-title">Pagamento aprovado!</h1>
        <p className="payment-page-description">
          Seu pedido foi confirmado com sucesso. Em breve você receberá um e-mail com os detalhes da compra.
        </p>

        {(paymentId || externalRef) && (
          <div className="payment-page-info">
            {paymentId && (
              <div className="payment-info-row">
                <span>ID do pagamento</span>
                <strong>{paymentId}</strong>
              </div>
            )}
            {externalRef && (
              <div className="payment-info-row">
                <span>Referência</span>
                <strong>{externalRef}</strong>
              </div>
            )}
          </div>
        )}

        <div className="payment-page-actions">
          <Link to="/" className="payment-btn payment-btn--primary">
            Continuar comprando
          </Link>
        </div>
      </div>
    </div>
  )
}
