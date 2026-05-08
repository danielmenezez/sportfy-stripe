import { useState } from "react"
import PageLayout from "../components/PageLayout"

export default function RastrearPedido() {
  const [codigo, setCodigo] = useState("")
  const [buscado, setBuscado] = useState(false)

  function handleBuscar(e) {
    e.preventDefault()
    if (codigo.trim()) setBuscado(true)
  }

  return (
    <PageLayout>
      <div className="placeholder-hero">
        <span className="section-label">Suporte</span>
        <h1>Rastrear pedido</h1>
        <p>
          Digite o código do seu pedido ou o número de rastreio para acompanhar a entrega.
        </p>
      </div>

      <div className="placeholder-content">
        <div className="placeholder-block">
          <form className="rastrear-form" onSubmit={handleBuscar}>
            <input
              className="rastrear-input"
              type="text"
              placeholder="Ex: SPORTFY-1234567890"
              value={codigo}
              onChange={(e) => { setCodigo(e.target.value); setBuscado(false) }}
              required
            />
            <button type="submit" className="rastrear-btn">
              Rastrear
            </button>
          </form>

          {buscado && (
            <div className="rastrear-resultado">
              <p>
                Pedido <strong>{codigo}</strong> não encontrado. Verifique o código ou entre em contato com o suporte.
              </p>
            </div>
          )}
        </div>
        <div className="placeholder-block placeholder-block--highlight">
          <h2>Não encontrou?</h2>
          <p>
            O código do pedido é enviado por e-mail após a confirmação da compra. Caso não encontre, entre em contato pelo <strong>suporte@sportfy.com.br</strong>.
          </p>
        </div>
      </div>
    </PageLayout>
  )
}
