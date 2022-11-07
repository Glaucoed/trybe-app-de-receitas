import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../components/componentsCss/Profile.css';

export default function Profile() {
  const getEmail = () => {
    if (JSON.parse(localStorage.getItem('user')) !== null) {
      const { email } = JSON.parse(localStorage.getItem('user'));
      return email;
    }
  };
  const getLocalStorage = getEmail();

  return (
    <>
      <Header header profile search={ false } title="Profile" />
      <Container className="profile">
        <Col>
          <Row className="profileEmail">
            <span
              data-testid="profile-email"
            >
              { `Usuário: ${getLocalStorage}` }

            </span>
          </Row>
        </Col>
        <Col className="buttons">
          <Link to="/done-recipes">
            <Button
              className="group-btn-profile"
              variant="warning"
              data-testid="profile-done-btn"
              type="button"
            >
              Done Recipes

            </Button>
          </Link>

          <Link to="/favorite-recipes">
            <Button
              className="group-btn-profile"
              variant="warning"
              data-testid="profile-favorite-btn"
              type="button"
            >
              Favorite Recipes

            </Button>
          </Link>

          <Link data-testid="profile-logout-btn" to="/">
            <Button
              className="group-btn-profile"
              variant="warning"
              onClick={ () => { localStorage.clear(); } }
              type="button"
            >
              Logout

            </Button>
          </Link>

        </Col>
      </Container>
      <Footer />
    </>

  );
}
