import { Link } from "react-router-dom"
import PageLayout from "../components/PageLayout"

export default function Ajuda() {
  return (
    <PageLayout>
      <div className="placeholder-hero">
        <span className="section-label">Suporte</span>
        <h1>Central de ajuda</h1>
        <p>
          Encontre respostas para as dúvidas mais comuns ou entre em contato com nosso suporte especializado.
        </p>
      </div>

      <div className="placeholder-content">
        <div className="placeholder-block">
          <h2>Tópicos frequentes</h2>
          <ul className="help-links">
            <li><Link to="/ajuda/trocas-e-devolucoes">Trocas e devoluções</Link></li>
            <li><Link to="/rastrear-pedido">Rastrear meu pedido</Link></li>
            <li><Link to="/contato">Falar com o suporte</Link></li>
          </ul>
        </div>
        <div className="placeholder-block placeholder-block--highlight">
          <h2>Horário de atendimento</h2>
          <p>
            Segunda a sexta: 9h às 18h<br />
            Sábado: 9h às 13h<br />
            E-mail: <strong>suporte@sportfy.com.br</strong>
          </p>
        </div>
      </div>
    </PageLayout>
  )
}
