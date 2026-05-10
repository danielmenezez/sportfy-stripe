import { useSearchParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"

export default function PagamentoSucesso() {
  const [params] = useSearchParams()
  const sessionId = params.get("session_id") || params.get("payment_id") || params.get("collection_id")
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (sessionId) {
      setLoading(true)
      fetch(`${import.meta.env.VITE_API_URL}/api/payment-status/${sessionId}`)
        .then((res) => res.json())
        .then((data) => setStatus(data.status))
        .catch(() => setStatus("unknown"))
        .finally(() => setLoading(false))
    }
  }, [sessionId])

  if (loading) {
    return (
      <div className="payment-page payment-page--sucesso">
        <div className="payment-page-card">
          <div className="payment-page-icon">⏳</div>
          <h1 className="payment-page-title">Verificando pagamento...</h1>
        </div>
      </div>
    )
  }

  if (status && status !== "paid") {
    return (
      <div className="payment-page payment-page--falha">
        <div className="payment-page-card">
          <div className="payment-page-icon payment-page-icon--falha">✕</div>
          <h1 className="payment-page-title">Pagamento não aprovado</h1>
          <p className="payment-page-description">
            Seu pagamento não foi confirmado. Status: {status}.
          </p>
          <div className="payment-page-actions">
            <Link to="/" className="payment-btn payment-btn--primary">
              Tentar novamente
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="payment-page payment-page--sucesso">
      <div className="payment-page-card">
        <div className="payment-page-icon payment-page-icon--sucesso">✓</div>
        <h1 className="payment-page-title">Pagamento aprovado!</h1>
        <p className="payment-page-description">
          Seu pedido foi confirmado com sucesso. Em breve você receberá um e-mail com os detalhes da compra.
        </p>

        {sessionId && (
          <div className="payment-page-info">
            <div className="payment-info-row">
              <span>ID do pedido</span>
              <strong>{sessionId}</strong>
            </div>
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
