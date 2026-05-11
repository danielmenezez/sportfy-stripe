import { Link } from "react-router-dom"

export default function SiteFooter() {
  return (
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
            <li><Link to="/produtos">Todos os produtos</Link></li>
            <li><Link to="/produtos?filtro=ofertas">Ofertas</Link></li>
            <li><Link to="/produtos?filtro=novidades">Novidades</Link></li>
            <li><Link to="/produtos?filtro=mais-vendidos">Mais vendidos</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Empresa</h4>
          <ul>
            <li><Link to="/sobre">Sobre nós</Link></li>
            <li><Link to="/carreiras">Carreiras</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/imprensa">Imprensa</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Suporte</h4>
          <ul>
            <li><Link to="/ajuda">Central de ajuda</Link></li>
            <li><Link to="/ajuda/trocas-e-devolucoes">Trocas e devoluções</Link></li>
            <li><Link to="/rastrear-pedido">Rastrear pedido</Link></li>
            <li><Link to="/contato">Fale conosco</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 SportFY. Todos os direitos reservados.</p>
        <div className="footer-payments">
          <span className="payment-badge">PIX</span>
          <span className="payment-badge">VISA</span>
          <span className="payment-badge">MASTER</span>
          <span className="payment-badge">MP</span>
        </div>
      </div>
    </footer>
  )
}
