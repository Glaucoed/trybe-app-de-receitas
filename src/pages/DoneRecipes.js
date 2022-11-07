import React, { useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import DoneRecipeCard from '../components/DoneRecipeCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NavDoneFavorite from '../components/NavDoneFavorite';
import '../components/componentsCss/NavFavoriteAndDone.css';

export default function DoneRecipes() {
  const [filter, setFilter] = useState('all');
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];

  const renderRecipes = filter === 'all'
    ? doneRecipes
    : doneRecipes.filter((meal) => meal.type === filter);

  return (
    <div>

      <Header header profile search={ false } title="Done Recipes" />

      <NavDoneFavorite setFilter={ setFilter } />

      <section className="containerFavAndDone">
        {
          renderRecipes.length === 0
            ? (
              <Container
                className="notRecipes"
              >
                <span className="rowFav">Sem receitas finalizadas</span>
              </Container>
            )
            : (
              <Container>
                <DoneRecipeCard food={ renderRecipes } />
              </Container>
            )
        }
      </section>

      <Footer />

    </div>

  );
}
