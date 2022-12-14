import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

function renderWithProvider(component) {
  const history = createMemoryHistory();
  return {
    ...render(
      <Router history={ history }>
        {component}
      </Router>,
      history,
    ),
  };
}
export default renderWithProvider;
