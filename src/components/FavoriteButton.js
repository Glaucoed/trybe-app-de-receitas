import React, { useContext } from 'react';
import PropTypes, { number, string } from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import MyContext from '../Context/MyContext';

function FavoriteButton({ receita, dataId }) {
  const { setRefresh } = useContext(MyContext);

  const favoriteToLocalStorage = () => {
    const favoritesOnLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newArray = [...favoritesOnLocalStorage]
      .filter((recipe) => recipe.id !== receita.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
    setRefresh(false);
  };

  return (
    <div>
      <button
        type="button"
        onClick={ () => favoriteToLocalStorage() }
        src={ blackHeartIcon }
        data-testid={ dataId }
      >
        <img src={ blackHeartIcon } alt="Heart Icon" />
      </button>
    </div>
  );
}

FavoriteButton.propTypes = {
  dataId: PropTypes.string.isRequired,
  // receita: PropTypes.objectOf.isRequired,
  receita: PropTypes.objectOf(
    PropTypes.shape({
      id: number,
      type: string,
      nationality: string,
      category: string,
      alcoholicOrNot: string,
      name: string,
      image: string,
    }),
  ).isRequired,
};

export default FavoriteButton;
