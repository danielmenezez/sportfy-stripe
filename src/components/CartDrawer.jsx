export default function CartDrawer({
  isOpen,
  cart,
  total,
  closeCart,
  increaseItem,
  decreaseItem,
  removeItem,
  checkout
}) {
  return (
    <>
      <div
        className={`cart-overlay ${isOpen ? "active" : ""}`}
        onClick={closeCart}
      />

      <aside className={`cart-drawer ${isOpen ? "active" : ""}`}>
        <div className="cart-drawer-header">
          <div className="cart-drawer-header-left">
            <span>SportFY</span>
            <h2>Seu carrinho</h2>
          </div>

          <button
            className="cart-close-btn"
            onClick={closeCart}
            aria-label="Fechar carrinho"
          >
            ✕
          </button>
        </div>

        <div className="cart-drawer-content">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <h3>Carrinho vazio</h3>
              <p>Adicione produtos para continuar sua compra.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div className="cart-product" key={item.id}>
                <img
                  className="cart-product-img"
                  src={item.image}
                  alt={item.name}
                />

                <div className="cart-product-info">
                  <h3>{item.name}</h3>

                  <p className="cart-product-price">
                    {item.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL"
                    })}
                  </p>

                  <div className="cart-product-controls">
                    <div className="cart-quantity">
                      <button onClick={() => decreaseItem(item.id)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseItem(item.id)}>+</button>
                    </div>

                    <button
                      className="remove-product"
                      onClick={() => removeItem(item.id)}
                    >
                      remover
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-drawer-footer">
          <div className="cart-total-row">
            <span>Total</span>
            <strong>
              {total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
              })}
            </strong>
          </div>

          <button
            className="cart-checkout-button"
            onClick={checkout}
            disabled={cart.length === 0}
          >
            Finalizar compra →
          </button>
        </div>
      </aside>
    </>
  )
}
