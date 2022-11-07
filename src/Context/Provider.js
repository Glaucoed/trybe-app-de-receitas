import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import mealsAPI from '../helpers/functionsAPI';
import drinksAPI from '../helpers/drinkAPI';

function Provider({ children }) {
  const [radio, setRadio] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const [buttonDrink, setDrink] = useState(false);
  const [buttonMeal, setMeal] = useState(true);
  const [condicionalRender, setCondRender] = useState(false);
  const [APIMeals, setAPIMeals] = useState([0, 1]);
  const [APIDrinks, setAPIDrinks] = useState([0, 1]);
  const [categoryMeal, setCategoryMeal] = useState([]);
  const [categoryDrink, setCategoryDrink] = useState([]);
  const [inProgress, setinProgress] = useState({});
  const [estadoParalelo, setEParalelo] = useState({});
  const [refresh, setRefresh] = useState(true);
  const [hidden, setHidden] = useState(false);

  const handleChangeRadio = ({ target }) => {
    setRadio(target.value);
  };
  const handleChange = ({ target }) => {
    setInputSearch(target.value);
  };
  useEffect(() => {
    const apiComida = async () => {
      const response = await mealsAPI('search.php?s=');
      setAPIMeals(response.meals);
    };
    const apiBebidas = async () => {
      const response = await drinksAPI('search.php?s=');
      setAPIDrinks(response.drinks);
    };
    const apiCategoryMeal = async () => {
      const { meals } = await mealsAPI('list.php?c=list');
      setCategoryMeal(meals);
    };
    const apiCategoryDrink = async () => {
      const { drinks } = await drinksAPI('list.php?c=list');
      setCategoryDrink(drinks);
    };
    apiCategoryDrink();
    apiCategoryMeal();
    apiComida();
    apiBebidas();
  }, [estadoParalelo]);
  const contextValue = useMemo(() => ({
    estadoParalelo,
    setEParalelo,
    inProgress,
    setinProgress,
    categoryDrink,
    setCategoryDrink,
    categoryMeal,
    setAPIDrinks,
    APIDrinks,
    APIMeals,
    setAPIMeals,
    condicionalRender,
    setCondRender,
    buttonMeal,
    buttonDrink,
    setDrink,
    setMeal,
    radio,
    handleChange,
    inputSearch,
    setInputSearch,
    handleChangeRadio,
    refresh,
    setRefresh,
    hidden,
    setHidden,

  }), [radio,
    inputSearch,
    buttonDrink,
    buttonMeal,
    APIMeals,
    condicionalRender,
    APIDrinks,
    inProgress,
    estadoParalelo,
    categoryDrink,
    categoryMeal,
    refresh,
    hidden,
  ]);

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}
Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Provider;
