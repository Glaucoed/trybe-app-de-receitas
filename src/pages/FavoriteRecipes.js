import React, { useState, useContext, useEffect } from 'react';
import Container from 'react-bootstrap/esm/Container';
import DoneRecipeCard from '../components/DoneRecipeCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MyContext from '../Context/MyContext';
import NavDoneFavorite from '../components/NavDoneFavorite';
import '../components/componentsCss/NavFavoriteAndDone.css';

export default function FavoriteRecipes() {
  const { refresh, setRefresh } = useContext(MyContext);
  useEffect(() => {
    const renderPage = () => {
      setRefresh(true);
    };
    renderPage();
  }, [refresh, setRefresh]);

  const [filter, setFilter] = useState('all');
  const doneRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  const renderRecipes = filter === 'all'
    ? doneRecipes
    : doneRecipes.filter((meal) => meal.type === filter);

  return (
    <div>
      <Header header profile search={ false } title="Favorite Recipes" />
      <NavDoneFavorite setFilter={ setFilter } />
      <section className="containerFavAndDone">
        { renderRecipes.length === 0
          ? (
            <Container
              className="notRecipes"
            >
              <span className="rowFav">Sem receitas favoritadas</span>
            </Container>
          )
          : (
            <Container>

              <DoneRecipeCard
                food={ renderRecipes }
              />
            </Container>
          ) }
      </section>

      <Footer />
    </div>
  );
}
