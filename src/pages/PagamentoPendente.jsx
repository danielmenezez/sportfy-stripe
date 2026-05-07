import { useSearchParams, Link } from "react-router-dom"

export default function PagamentoPendente() {
  const [params] = useSearchParams()
  const paymentId = params.get("payment_id") || params.get("collection_id")
  const externalRef = params.get("external_reference")

  return (
    <div className="payment-page payment-page--pendente">
      <div className="payment-page-card">
        <div className="payment-page-icon payment-page-icon--pendente">⏳</div>
        <h1 className="payment-page-title">Pagamento em análise</h1>
        <p className="payment-page-description">
          Seu pagamento está sendo processado. Você receberá uma confirmação por e-mail assim que o status for atualizado.
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
            Voltar para a loja
          </Link>
        </div>
      </div>
    </div>
  )
}
