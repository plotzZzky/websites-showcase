'use client'
import faq from '@comps/faq.json'


export default function HomePage() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME;
  const siteDesc = process.env.NEXT_PUBLIC_SITE_DESC;

  const FAQ_ITEMS = () => {
    // Cria os details com as informações do faq
    return faq.map(({question, answer}, index) => (
      <details key={index}>
        <summary> {question} </summary>
        <p> {answer} </p>
      </details>
    ))
  };

  return (
    <>
      <section id='Home'>
        
        <h1> {siteName} </h1>
        <h2 id='subtitle'> {siteDesc} </h2>

        <br/>
        <h2> Tudo direto no seu navegador. </h2>
        
        <h3 id="to-do">
          ✓ Nada para instalar <br/>
          ✓ Nenhum cadastro obrigatório  <br/>
          ✓ Acesso imediato  <br/>
          ✓ Sem coleta de dados  <br/>
        </h3>

        <h3> Simples assim. É <strong> Webdroid. </strong> </h3>

      </section>

      <section id='Faq'>
        <h2> Duvias frequentes: </h2>

        <div>
          {FAQ_ITEMS()}
        </div>

      </section>
    </>
  )
}