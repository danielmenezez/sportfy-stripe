import { useMemo, useState } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import Header from "./components/Header"
import Hero from "./components/Hero"
import ProductsGrid from "./components/ProductsGrid"
import FooterCheckout from "./components/FooterCheckout"
import CartDrawer from "./components/CartDrawer"
import SiteFooter from "./components/SiteFooter"
import PagamentoSucesso from "./pages/PagamentoSucesso"
import PagamentoFalha from "./pages/PagamentoFalha"
import PagamentoPendente from "./pages/PagamentoPendente"
import Produtos from "./pages/Produtos"
import Sobre from "./pages/Sobre"
import Carreiras from "./pages/Carreiras"
import Blog from "./pages/Blog"
import Imprensa from "./pages/Imprensa"
import Ajuda from "./pages/Ajuda"
import AjudaTrocas from "./pages/AjudaTrocas"
import RastrearPedido from "./pages/RastrearPedido"
import Contato from "./pages/Contato"
import { products } from "./data/products"

const CATEGORIES = [
  { id: "todos", label: "Todos" },
  { id: "roupas", label: "Roupas" },
  { id: "calcados", label: "Calçados" },
  { id: "acessorios", label: "Acessórios" },
  { id: "esportes", label: "Esportes" }
]

function useCartState() {
  const [cart, setCart] = useState([])

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id)
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...current, { ...product, quantity: 1 }]
    })
  }

  function increaseItem(productId) {
    setCart((current) =>
      current.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  function decreaseItem(productId) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  function removeItem(productId) {
    setCart((current) => current.filter((item) => item.id !== productId))
  }

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  )

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  )

  return { cart, addToCart, increaseItem, decreaseItem, removeItem, total, cartCount }
}

export default function App() {
  const {
    cart, addToCart, increaseItem, decreaseItem, removeItem, total, cartCount
  } = useCartState()

  const [isCartOpen, setIsCartOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("todos")
  const [toasts, setToasts] = useState([])

  const location = useLocation()
  const isPaymentPage = location.pathname.startsWith("/pagamento/")

  function showToast(message) {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 2800)
  }

  function addToCartWithToast(product) {
    addToCart(product)
    showToast(`${product.name} adicionado ao carrinho`)
  }

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
          customer: { name: "Cliente SportFY", email: "cliente@sportfy.com" }
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

  const sharedCartProps = {
    cartCount,
    openCart: () => setIsCartOpen(true),
    addToCart: addToCartWithToast,
    checkout,
    total,
    disabled: cart.length === 0
  }

  return (
    <>
      <Routes>
        {/* Página principal */}
        <Route
          path="/"
          element={
            <>
              <Header cartCount={cartCount} openCart={() => setIsCartOpen(true)} />
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
                addToCart={addToCartWithToast}
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
                    showToast("Inscrição realizada com sucesso!")
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

              <SiteFooter />

              <FooterCheckout
                total={total}
                checkout={checkout}
                disabled={cart.length === 0}
                cartCount={cartCount}
              />
            </>
          }
        />

        {/* Loja — produtos com filtro */}
        <Route path="/produtos" element={<Produtos {...sharedCartProps} />} />

        {/* Retorno do pagamento */}
        <Route path="/pagamento/sucesso" element={<PagamentoSucesso />} />
        <Route path="/pagamento/falha" element={<PagamentoFalha />} />
        <Route path="/pagamento/pendente" element={<PagamentoPendente />} />

        {/* Páginas institucionais */}
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/carreiras" element={<Carreiras />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/imprensa" element={<Imprensa />} />

        {/* Suporte */}
        <Route path="/ajuda" element={<Ajuda />} />
        <Route path="/ajuda/trocas-e-devolucoes" element={<AjudaTrocas />} />
        <Route path="/rastrear-pedido" element={<RastrearPedido />} />
        <Route path="/contato" element={<Contato />} />
      </Routes>

      {/* Overlays globais — ocultos em páginas de pagamento */}
      {!isPaymentPage && (
        <>
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
        </>
      )}

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
