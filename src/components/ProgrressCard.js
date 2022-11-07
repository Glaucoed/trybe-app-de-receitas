import React, { useContext, useEffect, useState } from 'react';
import './componentsCss/inProgressCard.css';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom';
import MyContext from '../Context/MyContext';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import ShareButton from './ShareButton';

export default function ProgrressCard({
  img,
  title,
  category,
  instructions,
  ingredients,
  id,
  type,
  nationality,
  alcoholicOrNot,
  strTag,

}) {
  const dateNow = new Date();
  const [isDone, setIsDone] = useState(true);
  const [isDone2, setIsDone2] = useState(true);
  const [favorite, setFavorite] = useState(false);
  const { setEParalelo } = useContext(MyContext);
  const history = useHistory();

  useEffect(() => {
    const arrFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (arrFavorite !== null) {
      arrFavorite.forEach((favorito) => {
        if (favorito.id === id) {
          setFavorite(true);
        }
      });
    } else {
      setFavorite(false);
    }
  }, [id]);
  useEffect(() => {
    const a = ingredients.filter((ingredient) => ingredient.isChecked !== true);
    if (a.length === 0) {
      setIsDone(false);
    } else {
      setIsDone(true);
    }
  }, [isDone2, ingredients]);
  const redirectDone = '/done-recipes';
  const handleChange = (e) => {
    setIsDone2(!isDone2);
    const localStorageItem = JSON.parse(localStorage.getItem(id));
    localStorageItem[1].forEach((element) => {
      if (element.ingredient === e.name) {
        element.isChecked = !element.isChecked;
      }
    });
    localStorage.setItem(id, JSON.stringify(localStorageItem));
    setEParalelo(localStorageItem);
  };

  const favoriteButton = () => {
    if (favorite === true) {
      const removeFav = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const favoritosFinal = removeFav.filter((favorito) => favorito.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoritosFinal));
      setFavorite(false);
    }
    if (favorite === false) {
      const addFav = JSON.parse(localStorage.getItem('favoriteRecipes'));

      if (addFav !== null) {
        const objetoFavorito = {
          id,
          nationality,
          name: title,
          category,
          alcoholicOrNot,
          type,
          image: img,
        };
        const addFav1 = [...addFav, objetoFavorito];
        localStorage.setItem('favoriteRecipes', JSON.stringify(addFav1));
      }
      if (addFav === null) {
        const objetoFavorito = {
          id,
          type,
          nationality,
          category,
          alcoholicOrNot,
          name: title,
          image: img,
        };
        const paralela = [objetoFavorito];
        localStorage.setItem('favoriteRecipes', JSON.stringify(paralela));
      }
      setFavorite(true);
    }
  };
  const clickBotaoFinish = () => {
    const done = JSON.parse(localStorage.getItem('doneRecipes'));
    if (done === null) {
      const objetocomida = {
        id,
        nationality,
        name: title,
        category,
        image: img,
        tags: strTag ? strTag.split(',') : [],
        alcoholicOrNot,
        type,
        doneDate: dateNow.toDateString(),
      };
      const paralela = [objetocomida];

      localStorage.setItem('doneRecipes', JSON.stringify(paralela));
      history.push(redirectDone);
    }
    if (done !== null) {
      const objetocomida = {
        id,
        nationality,
        name: title,
        category,
        image: img,
        tags: strTag ? strTag.split(',') : [],
        alcoholicOrNot,
        type,
        doneDate: dateNow.toDateString(),
      };
      const addfinished = [...done, objetocomida];
      localStorage.setItem('doneRecipes', JSON.stringify(addfinished));
      history.push(redirectDone);
    }
  };
  return (
    <Container className="recipeCentral">
      <Container className="recipeDetail">
        <img
          className="RecImg"
          data-testid="recipe-photo"
          src={ img }
          alt="img"
          width="100"
        />
        <div className="titleRecipe">
          <h1 data-testid="recipe-title">{title}</h1>
        </div>
        <h3 data-testid="recipe-category">
          <span>  Category: </span>
          {category}
        </h3>
        <p data-testid="instructions">
          {instructions}
        </p>
        <div className="ingredients">
          {ingredients.map((ingrediente, index) => (
            <Form key={ index }>
              <Form.Check.Input
                type="checkbox"
                checked={ ingrediente.isChecked }
                onChange={ (e) => handleChange(e.target) }
                name={ ingrediente.ingredient }
                id={ ingrediente.ingredient }
              />
              <Form.Check.Label
                htmlFor={ ingrediente.ingredient }
                data-testid={ `${index}-ingredient-step` }
                className={ ingrediente.isChecked ? 'checked' : 'notChecked' }
              >
                <span>
                  {`${ingrediente.quantity} ${ingrediente.ingredient}`}
                </span>
              </Form.Check.Label>
            </Form>
          ))}
        </div>
        <div className="btnCompFav">
          <ShareButton />
          <Button
            type="button"
            variant="warning"
            onClick={ favoriteButton }
          >
            <img
              src={ favorite ? blackHeartIcon : whiteHeartIcon }
              alt="favoriteIcon"
              data-testid="favorite-btn"
            />
          </Button>
        </div>
        <div className="btnStart">
          <Button
            variant="warning"
            name="finish"
            onClick={ clickBotaoFinish }
            data-testid="finish-recipe-btn"
            type="button"
            disabled={ isDone }
          >
            Finish Recipe
          </Button>
        </div>
      </Container>
    </Container>
  );
}
ProgrressCard.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
  img: PropTypes.string,
  title: PropTypes.string,
  category: PropTypes.string,
  instructions: PropTypes.string,
  ingredients: PropTypes.array,
  id: PropTypes.string,
}.isRequired;
