import React from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import ShareButton from './ShareButton';

import FavoriteButton from './FavoriteButton';

export default function DoneRecipeCard({ food: meals }) {
  return (
    meals.map((receita, index) => (
      <Row
        className="cardDoneAndFav"
        key={ receita.id }
      >
        <Col>
          <Link
            to={ receita.type === 'meal'
              ? `/meals/${receita.id}`
              : `/drinks/${receita.id}` }
          >
            <img
              className="imgDoneAndFav"
              src={ receita.image }
              alt="Imagem da receita"
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
        </Col>
        <Col>
          <Link
            to={ receita.type === 'meal'
              ? `/meals/${receita.id}`
              : `/drinks/${receita.id}` }
          >
            <h3 data-testid={ `${index}-horizontal-name` }>
              { receita.name }
            </h3>
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
              <div className="tagsFav">
                { receita.tags?.map((tag) => (
                  <p
                    key={ tag }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    { tag }
                  </p>
                ))}
              </div>

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

            <span
              data-testid={ `${index}-horizontal-done-date` }
              className="dateDoneAndFav"
            >
              { receita.doneDate }
            </span>

          </div>
        </Col>
      </Row>
    ))
  );
}
