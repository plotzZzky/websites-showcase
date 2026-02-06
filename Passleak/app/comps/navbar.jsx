'use client'
import './navbar.css'


export default function NavBar() {

  function goFindPage() {
    document.getElementById('Find').scrollIntoView();
  };

  function goTipPage() {
    document.getElementById('Tip').scrollIntoView();
  };

  function goFaqPage() {
    document.getElementById('Faq').scrollIntoView();
  };

  return (
    <nav>
      <span className="brand" onClick={goFindPage}>
        PassLeak
      </span>

      <div className="menu">
        <span onClick={goFindPage}>
          Buscar
        </span>

        <span onClick={goTipPage}>
          Dicas
        </span>

        <span onClick={goFaqPage}>
          Dúvidas
        </span>
      </div>
    </nav>
  )
}