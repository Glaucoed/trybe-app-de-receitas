import React from 'react';
import { Link } from 'react-router-dom';
import ShareButton from './ShareButton';
import './componentsCss/DoneRecipeCard.css';
import FavoriteButton from './FavoriteButton';

export default function DoneRecipeCard({ food: meals }) {
  return (
    meals.map((receita, index) => (
      <div
        key={ Math.random() }
      >

        <Link
          to={ receita.type === 'meal'
            ? `/meals/${receita.id}`
            : `/drinks/${receita.id}` }
        >
          <h3 data-testid={ `${index}-horizontal-name` }>
            { receita.name }
          </h3>
        </Link>
        <Link
          to={ receita.type === 'meal'
            ? `/meals/${receita.id}`
            : `/drinks/${receita.id}` }
        >
          <img
            className="img-done"
            src={ receita.image }
            alt="Imagem da receita"
            data-testid={ `${index}-horizontal-image` }
          />
        </Link>

        <div className="done-recipe-describe">
          <div className="done-recipe-top">
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              { receita.alcoholicOrNot === ''
                ? `${receita.nationality} - ${receita.category}`
                : receita.alcoholicOrNot }
            </p>

            <ShareButton
              dataId={ `${index}-horizontal-share-btn` }
              URL={ receita.type === 'meal'
                ? `/meals/${receita.id}`
                : `/drinks/${receita.id}` }
            />
            <FavoriteButton
              dataId={ `${index}-horizontal-favorite-btn` }
              receita={ receita }
            />
          </div>

          <p data-testid={ `${index}-horizontal-done-date` }>
            { receita.doneDate }
          </p>

          <div>
            {
              receita.tags?.map((tag) => (
                <p
                  key={ tag }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  { tag }
                </p>
              ))
            }
          </div>
        </div>
      </div>
    ))
  );
}
