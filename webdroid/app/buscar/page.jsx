'use client'
import { useState, useMemo, useEffect, useDeferredValue, useCallback } from "react"
import { useInView } from "react-intersection-observer";
import AppBar from "@comps/appbar";
import Card from "@comps/card";
import ViewApp from "@comps/modalView";
import cardsJson from "./result.json";
import "./page.css";


export default function CardsPage() {
  const [getFilterValue, setFilterValue] = useState("");
  const deferredFilterValue = useDeferredValue(getFilterValue);  // Valor do input com atraso para não travar a digitação

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [getModalData, setModalData] = useState();

  const CARDS_PER_PAGE = 50;
  const [visibleCount, setVisibleCount] = useState(CARDS_PER_PAGE);

  // Filtra todos cards, mas salva todos na memória
  const allFilteredCards = useMemo(() => {
    const term = deferredFilterValue?.toLowerCase() || '';
    let result = cardsJson || [];

    if (selectedCategory?.length > 0) {
      const selectedSet = new Set(selectedCategory);
      result = result.filter(card =>
        card.categories?.some(cat => selectedSet.has(cat))
      );
    }

    if (term) {
      result = result.filter(card =>
        card.name?.toLowerCase().includes(term)
      );
    }

    return result;
  }, [deferredFilterValue, selectedCategory, cardsJson]);

  // Reset -> Se o filtro mudar, volta para a primeira "página"
  useEffect(() => {
    setVisibleCount(CARDS_PER_PAGE);
  }, [allFilteredCards]);

  // PAGINAÇÃO -> Extrai apenas o pedaço que vai para o DOM
  const visibleCards = useMemo(() => {
    return allFilteredCards.slice(0, visibleCount);
  }, [allFilteredCards, visibleCount]);

  // Carrega mais cards para a memória
  const loadMoreCards = useCallback(() => {
    if (visibleCount < allFilteredCards.length) {
      setVisibleCount(prev => prev + CARDS_PER_PAGE);
    }
  }, [visibleCount, allFilteredCards.length]);

    // Observer para detectar o fim da página
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: '200px', // Carrega 200px antes do usuário chegar ao fim
  });

  // Trigger da rolagem infinita
  useEffect(() => {
    if (inView) {
      loadMoreCards();
    }
  }, [inView, loadMoreCards]);

  // Cria os cards dos apps
  const createAppCards = () => {
    if (visibleCards) {
      return (
        visibleCards.map(({name, icon, version, apk, description, license, source_code, hash}, index) => (
          <Card
            key={index}
            name={name}
            icon={icon}
            showModal={() => showViewAppModal(name, icon, version, apk, description, license, source_code, hash)}
          />
        ))
      )}
  };

  function showViewAppModal(name, icon, version, apk, description, license, source_code, hash) {
    setShowModal(showModal? false : true);
    setModalData(
      {"name": name, "icon": icon, "version": version, "apk": apk, "description": description, "license": license, "code": source_code, "hash": hash}
    )
  };

  const viewAppModal = () => {
    // So retorna o modal se tiver o modalData
    if (getModalData) {
      return (
        <ViewApp showModal={showModal} showModalViewApp={showViewAppModal} modalData={getModalData}/>
      )
    };
  };

  return (
    <>
      <AppBar 
        getFilterValue={getFilterValue} 
        setFilterValue={setFilterValue}
        setSelectedCategory={setSelectedCategory}
      />

      <section id="Cards">
        {createAppCards()}

        {viewAppModal()}

        <div ref={ref} style={{ height: '50px', margin: '20px 0' }}></div>
      </section>
    </>
  )
}