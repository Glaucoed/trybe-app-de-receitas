import React, { useState } from 'react';
import DoneRecipeCard from '../components/DoneRecipeCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
// import MyContext from '../Context/MyContext';
// const {} = useContext(MyContext)

export default function FavoriteRecipes() {
  // const key = 'favoriteRecipes';
  // window.localStorage.setItem(key, JSON.stringify(mockDoneRecipes));
  // const storage = localStorage.getItem('favoriteRecipes');
  // console.log(storage);

  const [filter, setFilter] = useState('all');
  const doneRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  const renderRecipes = filter === 'all'
    ? doneRecipes
    : doneRecipes.filter((meal) => meal.type === filter);

  return (
    <div>
      <Header header profile search={ false } title="Favorite Recipes" />
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
              <p>Sem receitas</p>
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
