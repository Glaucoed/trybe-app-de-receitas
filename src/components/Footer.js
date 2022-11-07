import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './componentsCss/Footer.css';

function Footer() {
  return (
    <footer
      className="footercss"
      data-testid="footer"
    >
      <div className="btnsFoter">
        <Link to="/drinks">

          <Button
            className="btnFooter"
            type="button"
            variant="none"
          >
            <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drink" />
          </Button>
        </Link>
        <Link to="/meals">

          <Button
            className="btnFooter"
            type="button"
            variant="none"
          >
            <img data-testid="meals-bottom-btn" src={ mealIcon } alt="meals" />
          </Button>
        </Link>
      </div>
    </footer>

  );
}
export default Footer;
