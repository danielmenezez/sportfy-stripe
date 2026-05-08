import { Link } from "react-router-dom"
import SiteFooter from "./SiteFooter"

export default function PageLayout({ children }) {
  return (
    <>
      <div className="simple-header">
        <Link to="/" className="logo">
          Sport<span>F</span><strong>Y</strong>
        </Link>
        <Link to="/" className="simple-header-back">
          ← Voltar para a loja
        </Link>
      </div>

      <main className="page-content">
        {children}
      </main>

      <SiteFooter />
    </>
  )
}
