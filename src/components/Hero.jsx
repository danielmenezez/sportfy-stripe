export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <span className="eyebrow">✦ Nova Coleção 2025</span>

        <h1>
          Performance<br />
          que <em>eleva</em><br />
          seu jogo.
        </h1>

        <p>
          Equipamentos e roupas de alta performance para atletas que não aceitam menos que o melhor.
        </p>

        <div className="hero-actions">
          <a href="#products" className="hero-button">
            Explorar coleção →
          </a>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <strong>+12k</strong>
            <span>Clientes</span>
          </div>
          <div className="hero-stat">
            <strong>4.9★</strong>
            <span>Avaliação</span>
          </div>
          <div className="hero-stat">
            <strong>100%</strong>
            <span>Garantia</span>
          </div>
        </div>
      </div>

      <div className="hero-image-wrap">
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1200&auto=format&fit=crop"
            alt="Tênis esportivo premium"
          />
        </div>

        <div className="hero-badge">
          <div className="hero-badge-icon">🔥</div>
          <div>
            <strong>Mais vendido</strong>
            <span>Runner Pro Elite</span>
          </div>
        </div>
      </div>
    </section>
  )
}
