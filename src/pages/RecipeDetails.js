import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, Link } from 'react-router-dom';
import MyContext from '../Context/MyContext';
import CardRecommendations from '../components/CardRecommentations';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

const negative1 = -1;

export default function RecipeDetails({ match: { url } }) {
  const { setinProgress, setEParalelo } = useContext(MyContext);
  const [info, setInfo] = useState({});
  const [renderVideo, setRenderVideo] = useState('');
  const [drinksRecommendations, setDrinksRecommendations] = useState([]);
  const [mealsRecommendations, setMealsRecommendations] = useState([]);
  const [type, setType] = useState('');
  const [id, setId] = useState('');
  const [copied, setCopied] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const six = 6;

  useEffect(() => {
    const requestAPI = async () => {
      const arrayUrl = url.split('/');
      const drinkOrFood = arrayUrl[1];
      const urlNumber = arrayUrl[2];
      setType(drinkOrFood);
      setId(urlNumber);
      const urlMeals = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${urlNumber}`;
      const urlDrink = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${urlNumber}`;
      const response = await fetch(drinkOrFood === 'meals' ? urlMeals : urlDrink);
      const result = await response.json();
      setInfo(result[drinkOrFood][0]);
      setRenderVideo(drinkOrFood);
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (inProgressRecipes) {
        return Object.keys(inProgressRecipes[drinkOrFood])
          .includes(urlNumber) ? setInProgress(true) : setInProgress(false);
      }
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (favoriteRecipes) {
        favoriteRecipes.forEach((recipe) => recipe.id === urlNumber && setFavorite(true));
      }
      setinProgress(result[drinkOrFood][0]);
    };
    requestAPI();
  }, [url, setinProgress]);

  useEffect(() => {
    const requestAPIs = async () => {
      const urlMealsRecommendations = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const responseMeals = await fetch(urlMealsRecommendations);
      const resultsMeals = await responseMeals.json();
      setMealsRecommendations(resultsMeals.meals);
      const urlDrinksRecommendations = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const responseDrinks = await fetch(urlDrinksRecommendations);
      const resultsDrinks = await responseDrinks.json();
      setDrinksRecommendations(resultsDrinks.drinks);
    };
    requestAPIs();
  }, [id]);
  const getIngredientsAndMeasures = (obj, prefix) => {
    const array = [];
    Object.entries(obj).forEach((element) => {
      if (element[0].startsWith(prefix) && element[1] !== '' && element[1] !== null) {
        array.push(element[1]);
      }
    });
    return array;
  };
  const ArrayIngredients = getIngredientsAndMeasures(info, 'strIngredient');
  const ArrayMeasures = getIngredientsAndMeasures(info, 'strMeasure');
  const createIngredientsAndMeasuresObj = () => {
    const newArray = [];
    let newObj = {};
    ArrayIngredients.forEach((element, index) => {
      newObj[element] = ArrayMeasures[index];
      newArray.push(newObj);
      newObj = {};
    });
    return newArray;
  };
  const ingredientsAndMeasures = createIngredientsAndMeasuresObj();
  const history = useHistory();
  const redirectToProgress = () => {
    if (url.includes('/drinks')) {
      setEParalelo([]);
      history.push(`${url}/in-progress`);
    }
    if (url.includes('/meals')) {
      history.push(`${url}/in-progress`);
    }
  };
  const copyLink = () => {
    const link = `http://localhost:3000/${type}/${id}`;
    copy(link);
    setCopied(true);
  };
  const favoriteToLocalStorage = () => {
    const objFavoriteToAdd = () => {
      const drinkOrMeal = Object.keys(info)[0];
      if (drinkOrMeal === 'idMeal') {
        const mealToAdd = { id: info.idMeal,
          type: 'meal',
          nationality: info.strArea,
          category: info.strCategory,
          alcoholicOrNot: '',
          name: info.strMeal,
          image: info.strMealThumb,
        };
        return mealToAdd;
      }
      if (drinkOrMeal === 'idDrink') {
        const drinkToAdd = {
          id: info.idDrink,
          type: 'drink',
          nationality: '',
          category: info.strCategory,
          alcoholicOrNot: info.strAlcoholic,
          name: info.strDrink,
          image: info.strDrinkThumb,
        };
        return drinkToAdd;
      }
    };
    const objToAdd = objFavoriteToAdd();
    const favoritesOnLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoritesOnLocalStorage && !favorite) {
      const arrayToAdd = [...favoritesOnLocalStorage, objToAdd];
      localStorage.setItem('favoriteRecipes', JSON.stringify(arrayToAdd));
      setFavorite(true);
    }
    if (!favoritesOnLocalStorage && !favorite) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([objToAdd]));
      setFavorite(true);
    }
    if (favorite) {
      const newArray = [...favoritesOnLocalStorage]
        .filter((recipe) => recipe.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
      setFavorite(false);
    }
  };

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ info.strDrinkThumb || info.strMealThumb }
        alt={ info.idDrink || info.idMeal }
      />
      <h3 data-testid="recipe-title">{info.strDrink || info.strMeal}</h3>
      <h4 data-testid="recipe-category">{info.strAlcoholic || info.strCategory}</h4>
      <ul>
        {
          ingredientsAndMeasures.map((ingredient, index) => (
            <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              {`${Object.keys(ingredient)[0]} -  ${Object.values(ingredient)[0]}`}
            </li>
          ))
        }
      </ul>
      <p data-testid="instructions">{info.strInstructions}</p>
      {
        renderVideo === 'meals'
          && (
            <div className="video-responsive">
              <iframe
                data-testid="video"
                width="853"
                height="480"
                src={ `https://www.youtube.com/embed/${info.strYoutube.split('=').slice(negative1).pop()}` }
                frameBorder="0"
                allowFullScreen
                title="Embedded youtube"
              />
            </div>
          )
      }
      <h4>Recomendações</h4>
      <div style={ { display: 'flex' } }>
        {
          type === 'drinks' && mealsRecommendations
            .slice(0, six).map((receita, index) => (
              <CardRecommendations
                id={ receita.idMeal }
                key={ Math.random() }
                nome={ receita.strMeal }
                srcImg={ receita.strMealThumb }
                index={ index }
                type={ type === 'meals' ? 'drinks' : 'meals' }
              />
            ))
        }
        {
          type === 'meals' && drinksRecommendations
            .slice(0, six).map((receita, index) => (
              <CardRecommendations
                id={ receita.idDrink }
                key={ Math.random() }
                nome={ receita.strDrink }
                srcImg={ receita.strDrinkThumb }
                index={ index }
                type={ type === 'meals' ? 'drinks' : 'meals' }
              />
            ))
        }
      </div>
      <Link to={ `/${type}/${id}/in-progress` }>
        <button
          data-testid="start-recipe-btn"
          type="button"
          style={ { position: 'fixed', bottom: '0px' } }
          onClick={ inProgress ? redirectToProgress() : undefined }
        >
          { inProgress ? 'Continue Recipe' : 'Start Recipe' }
        </button>

      </Link>
      <button type="button" data-testid="share-btn" onClick={ copyLink }>
        {' '}
        <img
          src={ shareIcon }
          alt="search-icon"
        />
        Compartilhar
      </button>
      <button type="button" onClick={ favoriteToLocalStorage }>
        <img
          src={ favorite ? blackHeartIcon : whiteHeartIcon }
          alt="favoriteIcon"
          data-testid="favorite-btn"
        />
      </button>
      { copied && <p>Link copied!</p>}
    </div>
  );
}
RecipeDetails.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};
