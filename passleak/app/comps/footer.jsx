'use client'
import "@comps/footer.css"


export default function Footer() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME;
  const siteDesc = process.env.NEXT_PUBLIC_SITE_DESC;

  return (
    <footer>
      <header>
        
        <h3>
          {siteName}
        </h3>

        <span>
          {siteDesc}
        </span>

      </header>

      <div>
        <h4> Importante: </h4>

        <span>
          Este projeto foi desenvolvido para fins acadêmicos e deve ser usado apenas como referência.
        </span>
      </div>

    </footer>
  )
}