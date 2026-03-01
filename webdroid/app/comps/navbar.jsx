'use client'
import { useRouter, usePathname } from 'next/navigation';
import './navbar.css'


export default function NavBar() {
  const brand = process.env.NEXT_PUBLIC_SITE_NAME;
  const pahtname = usePathname()
  const router = useRouter()

  function goHomePage() {
    if (pahtname === "/") {
      document.getElementById('Home').scrollIntoView();

    } else {
      router.push("/")
    }
  };

  function goFaqPage() {
    document.getElementById('Faq').scrollIntoView();
  };

  function goFindPage() {
    if (pahtname !== "/buscar") {
      router.push("/buscar");
    }
  };

  const FAQ_LINK = () => {
    if (pahtname === "/") {
      return (
        <span onClick={goFaqPage}>
          Dúvidas
        </span>
      )
    }
  }

  return (
    <nav>
      
      <span className="brand" onClick={goHomePage}>
        {brand}
      </span>

      <div className="menu">
        {FAQ_LINK()}

        <span onClick={goFindPage}>
          Buscar
        </span>

      </div>
    </nav>
  )
}