import ProductCard from "./ProductCard"

export default function ProductsGrid({ products, addToCart, categories, activeCategory, setActiveCategory }) {
  return (
    <section className="products-section" id="products">
      <div className="section-header">
        <div>
          <span className="section-label">Produtos</span>
          <h2>Destaques da coleção</h2>
        </div>
      </div>

      <div className="category-tabs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-tab ${activeCategory === cat.id ? "active" : ""}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {products.length === 0 ? (
        <div className="empty-products">
          <div className="empty-products-icon">🔍</div>
          <h3>Nenhum produto encontrado</h3>
          <p>Tente outra categoria ou explore toda a coleção.</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>
      )}
    </section>
  )
}
