import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import './componentsCss/Cards.css';

export default function Cards({ nome, srcImg, index, id }) {
  const history = useHistory();

  const redirectDetails = (idRecipe) => {
    if (history.location.pathname === '/meals') {
      history.push(`/meals/${idRecipe}`);
    }
    if (history.location.pathname === '/drinks') {
      history.push(`/drinks/${idRecipe}`);
    }
  };
  return (
    <Col className="cardCol">
      <Card
        onClick={ () => redirectDetails(id) }
        className="card"
        data-testid={ `${index}-recipe-card` }
      >
        <Card.Img
          variant="top"
          data-testid={ `${index}-card-img` }
          src={ srcImg }
          alt={ nome }
        />
        <Card.Title
          data-testid={ `${index}-card-name` }
        >
          {nome}

        </Card.Title>
      </Card>
    </Col>
  );
}

Cards.propTypes = {
  srcImg: PropTypes.string,
  nome: PropTypes.string,
}.isRequired;
