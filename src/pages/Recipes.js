import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MyContext from '../Context/MyContext';
import Cards from '../components/Cards';
import CategoryFilter from '../components/CategoryFilter';
import '../components/componentsCss/Recipes.css';

export default function Recipes() {
  const { location: { pathname } } = useHistory();
  const { APIMeals, APIDrinks, categoryDrink, categoryMeal } = useContext(MyContext);
  const renderAlert = APIMeals === null || APIDrinks === null;
  const functionSelector = pathname === '/meals';
  const DOZE = 12;

  return (
    <>
      <Header header profile search title={ functionSelector ? 'Meals' : 'Drinks' } />

      {
        functionSelector
          ? <CategoryFilter apiType={ categoryMeal } />
          : <CategoryFilter apiType={ categoryDrink } />
      }

      <section className="RecipesContainer">

        {
          !renderAlert
            ? (
              <Row md={ 2 } xs={ 2 } className="rowRecipe">
                {
                  functionSelector
                      && APIMeals.slice(0, DOZE).map((receita, index) => (
                        <Cards
                          id={ receita.idMeal }
                          key={ Math.random() }
                          nome={ receita.strMeal }
                          srcImg={ receita.strMealThumb }
                          index={ index }
                        />
                      ))
                }

                { !functionSelector
                && APIDrinks.slice(0, DOZE).map((receita, index) => (
                  <Cards
                    key={ Math.random() }
                    id={ receita.idDrink }
                    nome={ receita.strDrink }
                    srcImg={ receita.strDrinkThumb }
                    index={ index }
                  />
                ))}
              </Row>
            )
            : global.alert('Sorry, we haven\'t found any recipes for these filters.')
        }

      </section>

      <Footer />
    </>
  );
}
Recipes.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};
