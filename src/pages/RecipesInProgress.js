import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import mealsAPI from '../helpers/functionsAPI';
import drinksAPI from '../helpers/drinkAPI';
import DetailsArray from '../helpers/DetailsArray';
import ProgrressCard from '../components/ProgrressCard';
import MyContext from '../Context/MyContext';

export default function RecipesInProgress() {
  const [loading, setLoading] = useState(true);
  const { location: { pathname } } = useHistory();
  const { estadoParalelo, setEParalelo } = useContext(MyContext);
  const conditionalRender = pathname.includes('/meals');

  useEffect(() => {
    const chamadaDeApi = async () => {
      if (pathname.includes('meals')) {
        const ENDPOINT = pathname.replace('/meals/', '').replace('/in-progress', '');
        if (localStorage.getItem(ENDPOINT)) {
          setEParalelo(JSON.parse(localStorage.getItem(ENDPOINT)));
          setLoading(false);
        }
        if (localStorage.getItem(ENDPOINT) === null) {
          const { meals } = await mealsAPI(`lookup.php?i=${ENDPOINT}`);
          setEParalelo(DetailsArray(meals[0]));
          localStorage.setItem(ENDPOINT, JSON.stringify(DetailsArray(meals[0])));
          setLoading(false);
        }
      }
      if (pathname.includes('drinks')) {
        const ENDPOINT = pathname.replace('/drinks/', '').replace('/in-progress', '');
        if (localStorage.getItem(ENDPOINT) !== null) {
          setEParalelo(JSON.parse(localStorage.getItem(ENDPOINT)));
          setLoading(false);
        } else if (localStorage.getItem(ENDPOINT) == null) {
          const { drinks } = await drinksAPI(`lookup.php?i=${ENDPOINT}`);
          setEParalelo(DetailsArray(drinks[0]));
          localStorage.setItem(ENDPOINT, JSON.stringify(DetailsArray(drinks[0])));
          setLoading(false);
        }
      }
    };
    chamadaDeApi();
  }, [pathname, setEParalelo]);
  if (loading) {
    return <h1>loading...</h1>;
  }
  return (
    <div>
      <div>
        {!conditionalRender
      && <ProgrressCard
        alcoholicOrNot={ estadoParalelo[0].strAlcoholic }
        nationality=""
        type="drink"
        id={ estadoParalelo[0].idDrink }
        img={ estadoParalelo[0].strDrinkThumb }
        title={ estadoParalelo[0].strDrink }
        category={ estadoParalelo[0].strCategory }
        instructions={ estadoParalelo[0].strInstructions }
        ingredients={ estadoParalelo[1] }
      />}
      </div>
      <div>
        {conditionalRender
      && <ProgrressCard
        alcoholicOrNot=""
        nationality={ estadoParalelo[0].strArea }
        type="meal"
        strTag={ estadoParalelo[0].strTags }
        id={ estadoParalelo[0].idMeal }
        img={ estadoParalelo[0].strMealThumb }
        title={ estadoParalelo[0].strMeal }
        category={ estadoParalelo[0].strCategory }
        instructions={ estadoParalelo[0].strInstructions }
        ingredients={ estadoParalelo[1] }
      />}
      </div>
    </div>
  );
}
