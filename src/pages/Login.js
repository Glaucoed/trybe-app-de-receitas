import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../components/componentsCss/Login.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// import MyContext from '../Context/MyContext';
// const {} = useContext(MyContext)

export default function Login() {
  const [enableButton, setButton] = useState(true);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  useEffect(() => {
    const verifyEmail = '@';
    const verifyEmailDot = '.com';
    const minPassword = 7;
    const validEmail = email.includes(verifyEmail) && email.includes(verifyEmailDot);
    const validPassword = password.length >= minPassword;
    const finalValidation = validEmail && validPassword;
    if (password.length < minPassword) {
      setButton(true);
    }
    if (finalValidation) {
      setButton(false);
    }
  }, [email, password]);

  const history = useHistory();

  const enterApp = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };
  return (
    <div className="background">
      <div className="loginForm">
        <Form className="loginInputs">
          <h1 className="titleLogin">app de receitas</h1>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address:</Form.Label>
            <Form.Control
              type="text"
              data-testid="email-input"
              value={ email }
              onChange={ (e) => setemail(e.target.value) }
              placeholder="name@example.com"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              data-testid="password-input"
              value={ password }
              onChange={ (e) => setpassword(e.target.value) }
            />
          </Form.Group>

          <Button
            className="btnEnter"
            variant="warning"
            type="button"
            data-testid="login-submit-btn"
            onClick={ () => enterApp() }
            disabled={ enableButton }
          >
            Enter
          </Button>
        </Form>
      </div>
    </div>
  );
}
