import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import mockFavorite from './mocks/mockFavorite';

describe('Favorite Tests', () => {
  const route = '/favorite-recipes';
  beforeEach(() => {
    window.localStorage.clear();
  });
  it('Verifica o mock da tela de favoritos', () => {
    const { history } = renderWithRouter(<App />);
    const key = 'favoriteRecipes';

    window.localStorage.setItem(key, JSON.stringify(mockFavorite));
    act(() => {
      history.push(route);
    });
    expect(localStorage.getItem(key)).toEqual(JSON.stringify(mockFavorite));
    expect(history.location.pathname).toBe('/favorite-recipes');
    const btnAll = screen.getByRole('button', { name: /all/i });
    const btnDrinks = screen.getByRole('button', { name: /drinks/i });
    const btnMeals = screen.getByTestId('filter-by-meal-btn');

    const arrabiataTitle = screen.getByRole('heading', { name: /spicy arrabiata penne/i });
    const aquamarineTitle = screen.getByRole('heading', { name: /aquamarine/i });

    userEvent.click(btnDrinks);
    expect(arrabiataTitle).not.toBeInTheDocument();

    userEvent.click(btnMeals);
    expect(aquamarineTitle).not.toBeInTheDocument();

    userEvent.click(btnAll);
  });

  it('Verifica o mock da tela de favoritos', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push(route);
    });

    const titleRecipes = screen.getByText(/sem receitas/i);
    expect(titleRecipes).toBeInTheDocument();
  });
});
