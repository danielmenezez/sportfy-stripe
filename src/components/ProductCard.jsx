function calcDiscount(price, originalPrice) {
  if (!originalPrice) return null
  return Math.round((1 - price / originalPrice) * 100)
}

export default function ProductCard({ product, addToCart }) {
  const discount = calcDiscount(product.price, product.originalPrice)

  return (
    <article className="product-card">
      <div className="product-image">
        <img
          src={product.image}
          alt={product.name}
          onError={(e) => {
            e.target.onerror = null
            e.target.style.opacity = "0"
          }}
        />
        {product.badge && (
          <span className={`product-badge ${product.badge.toLowerCase()}`}>
            {product.badge}
          </span>
        )}
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>

        {product.description && (
          <p className="product-description">{product.description}</p>
        )}

        <div className="product-pricing">
          <span className="product-price">
            {product.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL"
            })}
          </span>

          {product.originalPrice && (
            <span className="product-original-price">
              {product.originalPrice.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
              })}
            </span>
          )}

          {discount && (
            <span className="product-discount">-{discount}%</span>
          )}
        </div>

        <button
          className="add-to-cart-btn"
          onClick={() => addToCart(product)}
        >
          Adicionar ao carrinho
        </button>
      </div>
    </article>
  )
}
