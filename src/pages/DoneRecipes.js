import React, { useState } from 'react';
import DoneRecipeCard from '../components/DoneRecipeCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import mockDoneRecipes from '../tests/mocks/mockDoneRecipes';

export default function DoneRecipes() {
  const [filter, setFilter] = useState('all');
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];

  const renderRecipes = filter === 'all'
    ? doneRecipes
    : doneRecipes.filter((meal) => meal.type === filter);

  const key = 'doneRecipes';
  window.localStorage.setItem(key, JSON.stringify(mockDoneRecipes));
  const storage = localStorage.getItem('doneRecipes');
  console.log(storage);

  return (
    <div>
      <Header header profile search={ false } title="Done Recipes" />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => {
            setFilter('all');
          } }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => {
            setFilter('meal');
          } }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => {
            setFilter('drink');
          } }
        >
          Drinks
        </button>
      </div>
      <section>
        { renderRecipes.length === 0
          ? (
            <div>
              <p>Sem receitas finalizadas</p>
            </div>
          )
          : (
            <DoneRecipeCard
              food={ renderRecipes }
            />
          ) }
      </section>

      <Footer />
    </div>
  );
}
