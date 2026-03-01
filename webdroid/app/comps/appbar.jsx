'use client'
import './navbar.css'


export default function AppBar(props) {

  const categories = {
    "Lojas": ["App Manager",], 
    "Web": ["Browser", "Email", "Social networks"],
    "Ferramentas": ["Calculator", "Calendar & Agenda", "Task"],
    "Sistema": ["System", "Text editor", "Customization"],
    "Dev": ["Development", "Encryption of files and vaults"],
    "Art": ["Draw", "To design", "Graphics"],
    "Rede": ["Connectivity", "DNS and domains", "VPN and proxy"],
    "Media": ["Local media player", "Multimedia", "Online Media Player"],
    "todos": undefined
  };

  // Cria os links das categorias
  const CATEGORIES_LINKS = () =>
    Object.keys(categories).map((category) => (
      <span
        key={category}
        onClick={() => props.setSelectedCategory(categories[category])}
        style={{ cursor: "pointer" }}
      >
        {category}
      </span>
  ));

  // Salva o valor digitado no input
  function HandleInputValue(value) {
    props.setFilterValue(value);
  };

  return (
    <div id="Appbar">

      <input
        type="text"
        placeholder={"Buscar pelo nome do app"}
        value={props.getFilterValue}
        onChange={e => HandleInputValue(e.target.value)}
      />

      {CATEGORIES_LINKS()}
      
    </div>
  )
}