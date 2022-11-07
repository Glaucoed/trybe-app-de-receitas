import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import './componentsCss/CardRecommentation.css';

export default function CardRecommentations({ nome, srcImg, index, id, type }) {
  return (

    <Col
      className="cardRecom"
      data-testid={ `${index}-recommendation-card` }
    >
      <Card className="cardRem">

        <Link to={ `/${type}/${id}` }>
          <Card.Img
            className="imgRecom"
            src={ srcImg }
            alt={ `imagem${nome} ` }
            data-testid={ `${index}-card-img` }
          />
          <Card.Title
            data-testid={ `${index}-recommendation-title` }
          >
            {nome}
          </Card.Title>
        </Link>
      </Card>

    </Col>

  );
}

CardRecommentations.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  nome: PropTypes.string.isRequired,
  srcImg: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

Card.propTypes = {
  srcImg: PropTypes.string,
  nome: PropTypes.string,
}.isRequired;
