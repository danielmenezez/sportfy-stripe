export default function FooterCheckout({ total, checkout, disabled, cartCount }) {
  return (
    <div className={`checkout-bar ${disabled ? "hidden" : ""}`} id="checkout">
      <div className="checkout-bar-left">
        <span>
          {cartCount} {cartCount === 1 ? "item" : "itens"} no carrinho
        </span>
        <strong>
          {total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
          })}
        </strong>
      </div>

      <button onClick={checkout} disabled={disabled}>
        Finalizar compra →
      </button>
    </div>
  )
}
