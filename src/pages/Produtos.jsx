import { useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import Header from "../components/Header"
import ProductsGrid from "../components/ProductsGrid"
import FooterCheckout from "../components/FooterCheckout"
import SiteFooter from "../components/SiteFooter"
import { products } from "../data/products"

const CATEGORIES = [
  { id: "todos", label: "Todos" },
  { id: "roupas", label: "Roupas" },
  { id: "calcados", label: "Calçados" },
  { id: "acessorios", label: "Acessórios" },
  { id: "esportes", label: "Esportes" }
]

const FILTRO_LABELS = {
  "ofertas": "Ofertas",
  "novidades": "Novidades",
  "mais-vendidos": "Mais vendidos"
}

export default function Produtos({ cartCount, openCart, addToCart, checkout, total, disabled }) {
  const [searchParams] = useSearchParams()
  const filtro = searchParams.get("filtro")
  const [activeCategory, setActiveCategory] = useState("todos")

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (filtro === "ofertas") result = result.filter((p) => p.badge === "Oferta")
    else if (filtro === "novidades") result = result.filter((p) => p.badge === "Novo")
    // "mais-vendidos" e sem filtro: exibe todos

    if (activeCategory !== "todos") {
      result = result.filter((p) => p.category === activeCategory)
    }

    return result
  }, [filtro, activeCategory])

  const pageTitle = FILTRO_LABELS[filtro] || "Todos os produtos"

  return (
    <>
      <Header cartCount={cartCount} openCart={openCart} />

      <div className="produtos-page-hero">
        <span className="section-label">Loja</span>
        <h1 className="produtos-page-title">{pageTitle}</h1>
        <p className="produtos-page-subtitle">
          {filtro === "ofertas" && "Aproveite nossos melhores preços por tempo limitado."}
          {filtro === "novidades" && "Conheça os últimos lançamentos da SportFY."}
          {filtro === "mais-vendidos" && "Os produtos favoritos dos nossos clientes."}
          {!filtro && "Explore toda a linha SportFY de equipamentos e roupas esportivas."}
        </p>
      </div>

      <ProductsGrid
        products={filteredProducts}
        addToCart={addToCart}
        categories={CATEGORIES}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <SiteFooter />

      <FooterCheckout
        total={total}
        checkout={checkout}
        disabled={disabled}
        cartCount={cartCount}
      />
    </>
  )
}
