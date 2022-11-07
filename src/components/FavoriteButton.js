import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/esm/Button';
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
    <Button
      variant="warning"
      type="button"
      onClick={ () => favoriteToLocalStorage() }
      src={ blackHeartIcon }
      data-testid={ dataId }
    >
      <img src={ blackHeartIcon } alt="Heart Icon" />
    </Button>
  );
}

FavoriteButton.propTypes = {
  dataId: PropTypes.string.isRequired,
  receita: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    nationality: PropTypes.string,
    category: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default FavoriteButton;
