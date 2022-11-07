import PropTypes from 'prop-types';
import Button from 'react-bootstrap/esm/Button';
import React from 'react';
import './componentsCss/NavFavoriteAndDone.css';

export default function NavDoneFavorite({ setFilter }) {
  return (
    <nav className="categoryNav">
      <Button
        className="btnDoneAndFav"
        variant="warning"
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => { setFilter('all'); } }
      >
        All
      </Button>
      <Button
        className="btnDoneAndFav"
        variant="warning"
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ () => { setFilter('meal'); } }
      >
        Meals
      </Button>
      <Button
        className="btnDoneAndFav"
        variant="warning"
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => { setFilter('drink'); } }
      >
        Drinks
      </Button>
    </nav>
  );
}

NavDoneFavorite.propTypes = {
  setFilter: PropTypes.func.isRequired,
};
