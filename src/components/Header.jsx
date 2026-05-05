export default function Header({ cartCount, openCart }) {
  return (
    <header className="header">
      <div className="logo">
        Sport<span>F</span><strong>Y</strong>
      </div>

      <nav className="nav">
        <a href="#products">Masculino</a>
        <a href="#products">Feminino</a>
        <a href="#products">Categorias</a>
        <a href="#products">Ofertas</a>
      </nav>

      <div className="header-actions">
        <button className="cart-pill" onClick={openCart}>
          🛒 Carrinho
          {cartCount > 0 && (
            <span className="cart-count">{cartCount}</span>
          )}
        </button>
      </div>
    </header>
  )
}
