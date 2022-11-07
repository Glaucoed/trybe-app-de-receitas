import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './componentsCss/CategoryFilter.css';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import MyContext from '../Context/MyContext';
import mealsAPI from '../helpers/functionsAPI';
import drinksAPI from '../helpers/drinkAPI';

export default function CategoryFilter({ apiType }) {
  const CINCO = 5;
  const apiString = 'search.php?s=';
  const { categoryMeal, setAPIDrinks, setAPIMeals, hidden } = useContext(MyContext);

  const clickdrink = async (cat) => {
    const { drinks } = await drinksAPI(`filter.php?c=${cat}`);
    setAPIDrinks(drinks);
    setButtonState(false);
  };
  const clickmeal = async (cat) => {
    const { meals } = await mealsAPI(`filter.php?c=${cat}`);
    setAPIMeals(meals);
  };

  const allMeals = async () => {
    const response = await mealsAPI(apiString);
    setAPIMeals(response.meals);
  };
  const allDrinks = async () => {
    const response = await drinksAPI(apiString);
    setAPIDrinks(response.drinks);
  };

  return (
    !hidden
    && (
      <ToggleButtonGroup name="options" className="categoryFilter">

        <ToggleButton
          id="tbg-radio-1"
          value={ 1 }
          className="btnCategory"
          variant="warning"
          type="button"
          data-testid="All-category-filter"
          onClick={
            apiType === categoryMeal
              ? () => allMeals()
              : () => allDrinks()
          }
        >
          All
        </ToggleButton>
        {apiType.slice(0, CINCO).map((categoria, index) => (

          <ToggleButton
            id={ `tbg-check-${index + 2}` }
            value={ index + 2 }
            className="btnCategory"
            variant="warning"
            onClick={
              apiType === categoryMeal
                ? () => clickmeal(categoria.strCategory)
                : () => clickdrink(categoria.strCategory)
            }
            type="button"
            key={ Math.random() }
            data-testid={ `${categoria.strCategory}-category-filter` }
          >
            {categoria.strCategory}

          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    )
  );
}
CategoryFilter.propTypes = {
  apiType: PropTypes.array,
}.isRequired;
