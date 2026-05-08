import PageLayout from "../components/PageLayout"

export default function Blog() {
  return (
    <PageLayout>
      <div className="placeholder-hero">
        <span className="section-label">Conteúdo</span>
        <h1>Blog</h1>
        <p>
          Dicas de treino, nutrição esportiva, lançamentos e novidades do mundo do esporte — tudo em um só lugar.
        </p>
      </div>

      <div className="placeholder-content">
        <div className="placeholder-block placeholder-block--highlight">
          <h2>Em breve</h2>
          <p>
            Estamos preparando conteúdos incríveis sobre performance, treino e estilo de vida saudável. Inscreva-se na nossa newsletter para ser o primeiro a saber quando publicarmos.
          </p>
        </div>
      </div>
    </PageLayout>
  )
}
