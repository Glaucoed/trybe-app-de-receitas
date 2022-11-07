import React, { useContext, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import MyContext from '../Context/MyContext';
import mealsAPI from '../helpers/functionsAPI';
import drinksAPI from '../helpers/drinkAPI';

export default function SearchBar() {
  const [inputSearch, handleChange] = useState('');

  const {
    setAPIMeals,
    setAPIDrinks,
    APIDrinks,
    APIMeals,
    radio,
    handleChangeRadio,
    hidden,
    setHidden,
  } = useContext(MyContext);

  const history = useHistory();
  const functionSelector = history.location.pathname === '/meals';
  const clickMeals = async () => {
    if (radio === 'ingrediente') {
      const ingredientesApi = await mealsAPI(`filter.php?i=${inputSearch}`);
      setAPIMeals(ingredientesApi.meals);
      setHidden(!hidden);
    }
    if (radio === 'nome') {
      const ingredientesApi = await mealsAPI(`search.php?s=${inputSearch}`);
      setAPIMeals(ingredientesApi.meals);
      setHidden(!hidden);
    }
    if (radio === 'primeira-letra') {
      if (inputSearch.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      const ingredientesApi = await mealsAPI(`search.php?f=${inputSearch}`);
      setAPIMeals(ingredientesApi.meals);
      setHidden(!hidden);
    }
  };

  const clickBebidas = async () => {
    if (radio === 'ingrediente') {
      const ingredientesApi = await drinksAPI(`filter.php?i=${inputSearch}`);
      setAPIDrinks(ingredientesApi.drinks);
    }
    if (radio === 'nome') {
      const ingredientesApi = await drinksAPI(`search.php?s=${inputSearch}`);
      setAPIDrinks(ingredientesApi.drinks);
    }
    if (radio === 'primeira-letra') {
      if (inputSearch.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      const ingredientesApi = await drinksAPI(`search.php?f=${inputSearch}`);
      setAPIDrinks(ingredientesApi.drinks);
    }
  };
  useEffect(() => {
    if (APIMeals === null) {
      return console.log('A');
    }
    if (APIMeals.length === 1) {
      history.push(`/meals/${APIMeals[0].idMeal}`);
    }
  }, [APIMeals, history, functionSelector]);

  useEffect(() => {
    if (APIDrinks === null) {
      return console.log('A');
    }
    if (APIDrinks.length === 1) {
      history.push(`/drinks/${APIDrinks[0].idDrink}`);
    }
  }, [APIDrinks, history, functionSelector]);

  return (
    <Form>
      <Form.Group className="mb-3" controlId="inputSearch">
        <Form.Control
          type="text"
          placeholder="Digite sua busca"
          value={ inputSearch }
          data-testid="search-input"
          onChange={ (e) => handleChange(e.target.value) }
        />
      </Form.Group>

      <Form.Check
        inline
        label="Ingredient"
        data-testid="ingredient-search-radio"
        type="radio"
        value="ingrediente"
        onChange={ handleChangeRadio }
        name={ radio }
        id="ingredient"
      />

      <Form.Check
        inline
        label="Name"
        data-testid="name-search-radio"
        type="radio"
        value="nome"
        onChange={ handleChangeRadio }
        name={ radio }
        id="name"
      />

      <Form.Check
        inline
        label="First letter"
        data-testid="first-letter-search-radio"
        type="radio"
        value="primeira-letra"
        onChange={ handleChangeRadio }
        name={ radio }
        id="firstletter"
      />
      <div className="searchBarhBtn">
        <Button
          className="btnSearchBar"
          variant="warning"
          type="button"
          data-testid="exec-search-btn"
          onClick={ functionSelector ? clickMeals : clickBebidas }
        >
          Search
        </Button>
      </div>
    </Form>
  );
}
