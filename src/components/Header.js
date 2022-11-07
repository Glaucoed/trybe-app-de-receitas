import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import MyContext from '../Context/MyContext';
import './componentsCss/Header.css';

export default function Header({ title, header, profile, search }) {
  const history = useHistory();
  const { hidden, setHidden } = useContext(MyContext);
  // setAPIDrinks, setAPIMeals, = context

  const handleHistoryPush = () => {
    history.push('/profile');
  };

  const handleHiddenInput = () => {
    setHidden(!hidden);
    // setAPIDrinks([0, 1]);
    // setAPIMeals([0, 1]);
  };

  return (
    <header>
      <Container>
        <Row>
          <Col>
            {
              profile
        && (
          <Button
            className="btnProfileH"
            type="button"
            variant="none"
            onClick={ handleHistoryPush }
          >
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="profile-icon"
            />
          </Button>
        )
            }
          </Col>
          <Col className="colTitle">
            {
              header
        && (
          <h3
            data-testid="page-title"
            className="titleHeader"
          >
            {title}
          </h3>

        )
            }
          </Col>
          <Col className="inputSearch">
            {
              search
        && (
          <Button
            className="btnInputH"
            type="button"
            variant="none"
            onClick={ handleHiddenInput }
          >
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="search-icon"
            />
          </Button>

        )

            }
          </Col>
          {
            hidden
        && (<SearchBar />)
          }
        </Row>
      </Container>

    </header>

  );
}

Header.propTypes = {
  header: PropTypes.bool.isRequired,
  profile: PropTypes.bool.isRequired,
  search: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};
