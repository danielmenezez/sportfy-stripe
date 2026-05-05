import { useMemo, useState } from "react"
import Header from "./components/Header"
import Hero from "./components/Hero"
import ProductsGrid from "./components/ProductsGrid"
import FooterCheckout from "./components/FooterCheckout"
import CartDrawer from "./components/CartDrawer"
import { products } from "./data/products"

const CATEGORIES = [
  { id: "todos", label: "Todos" },
  { id: "roupas", label: "Roupas" },
  { id: "calcados", label: "Calçados" },
  { id: "acessorios", label: "Acessórios" },
  { id: "esportes", label: "Esportes" }
]

export default function App() {
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("todos")
  const [toasts, setToasts] = useState([])

  function showToast(message) {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 2800)
  }

  function addToCart(product) {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === product.id)
      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...currentCart, { ...product, quantity: 1 }]
    })
    showToast(`${product.name} adicionado ao carrinho`)
  }

  function increaseItem(productId) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  function decreaseItem(productId) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  function removeItem(productId) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    )
  }

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  )

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  )

  const filteredProducts = useMemo(() => {
    if (activeCategory === "todos") return products
    return products.filter((p) => p.category === activeCategory)
  }, [activeCategory])

  async function checkout() {
    if (cart.length === 0) return

    const apiUrl = import.meta.env.VITE_API_URL
    if (!apiUrl) {
      showToast("Erro: VITE_API_URL não configurada.")
      return
    }

    try {
      const response = await fetch(`${apiUrl}/api/create-preference`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart,
          customer: {
            name: "Cliente SportFY",
            email: "cliente@sportfy.com"
          }
        })
      })

      const data = await response.json()

      if (!response.ok) {
        showToast("Erro ao criar pagamento. Verifique o backend.")
        return
      }

      window.location.href = data.sandbox_init_point || data.init_point
    } catch {
      showToast("Erro ao conectar com o servidor.")
    }
  }

  return (
    <>
      <Header
        cartCount={cartCount}
        openCart={() => setIsCartOpen(true)}
      />

      <Hero />

      <div className="trust-bar">
        <div className="trust-item">
          <span className="trust-item-icon">🚚</span>
          Frete grátis acima de R$ 299
        </div>
        <div className="trust-item">
          <span className="trust-item-icon">🔄</span>
          Troca fácil em 30 dias
        </div>
        <div className="trust-item">
          <span className="trust-item-icon">🔒</span>
          Pagamento 100% seguro
        </div>
        <div className="trust-item">
          <span className="trust-item-icon">⭐</span>
          Suporte especializado
        </div>
      </div>

      <ProductsGrid
        products={filteredProducts}
        addToCart={addToCart}
        categories={CATEGORIES}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <section className="newsletter-section">
        <h2>Fique por dentro das novidades</h2>
        <p>Receba ofertas exclusivas e lançamentos direto no seu e-mail.</p>
        <form
          className="newsletter-form"
          onSubmit={(e) => {
            e.preventDefault()
            showToast("Inscrição realizada com sucesso! 🎉")
            e.target.reset()
          }}
        >
          <input
            className="newsletter-input"
            type="email"
            placeholder="seu@email.com"
            required
          />
          <button type="submit" className="newsletter-btn">
            Inscrever-se
          </button>
        </form>
      </section>

      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              Sport<span>F</span><strong>Y</strong>
            </div>
            <p>
              Equipamentos e roupas esportivas de alta performance para quem leva o esporte a sério.
            </p>
          </div>

          <div className="footer-col">
            <h4>Loja</h4>
            <ul>
              <li><a href="#products">Todos os produtos</a></li>
              <li><a href="#products">Ofertas</a></li>
              <li><a href="#products">Novidades</a></li>
              <li><a href="#products">Mais vendidos</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Empresa</h4>
            <ul>
              <li><a href="#">Sobre nós</a></li>
              <li><a href="#">Carreiras</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Imprensa</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Suporte</h4>
            <ul>
              <li><a href="#">Central de ajuda</a></li>
              <li><a href="#">Trocas e devoluções</a></li>
              <li><a href="#">Rastrear pedido</a></li>
              <li><a href="#">Fale conosco</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 SportFY. Todos os direitos reservados.</p>
          <div className="footer-payments">
            <span className="payment-badge">PIX</span>
            <span className="payment-badge">VISA</span>
            <span className="payment-badge">MASTER</span>
            <span className="payment-badge">MP</span>
          </div>
        </div>
      </footer>

      <FooterCheckout
        total={total}
        checkout={checkout}
        disabled={cart.length === 0}
        cartCount={cartCount}
      />

      <CartDrawer
        isOpen={isCartOpen}
        cart={cart}
        total={total}
        closeCart={() => setIsCartOpen(false)}
        increaseItem={increaseItem}
        decreaseItem={decreaseItem}
        removeItem={removeItem}
        checkout={checkout}
      />

      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast">
            <div className="toast-icon">✓</div>
            {toast.message}
          </div>
        ))}
      </div>
    </>
  )
}
