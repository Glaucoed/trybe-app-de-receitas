import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import drinks from '../../cypress/mocks/drinks';
import meals from '../../cypress/mocks/meals';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';

const SEARCHBTN = 'exec-search-btn';

describe('Testando o redireciomento da Details name', () => {
  it('test radio button name drink', async () => {
    const { history } = renderWithRouter(<App />);
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(oneDrink),
    }));

    act(() => {
      history.push('/drinks');
    });

    expect(history.location.pathname).toBe('/drinks');

    const buttonSearch = screen.getByRole('button', { name: /search-icon/i });
    userEvent.click(buttonSearch);

    const inputSearch = screen.getByRole('textbox');
    const radioName = screen.getByRole('radio', { name: /name/i });
    const btnSearch = screen.getByTestId(SEARCHBTN);

    userEvent.type(inputSearch, 'Aquamarine');
    userEvent.click(radioName);
    userEvent.click(btnSearch);
    await screen.findByTestId('recipe-title');
    expect(global.fetch).toHaveBeenCalled();
    expect(history.location.pathname).toBe('/drinks/178319');
    global.fetch.mockClear();
  });
});

describe('test SearchBar /Meals', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(meals),
    }));
  });
  it('test radio button ingredient', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/meals');
    });

    expect(history.location.pathname).toBe('/meals');

    const buttonSearch = screen.getByRole('button', { name: /search-icon/i });

    userEvent.click(buttonSearch);

    const inputSearch = screen.getByRole('textbox');
    const radioName = screen.getByRole('radio', { name: /ingredient/i });
    const btnSearch = screen.getByTestId(SEARCHBTN);

    userEvent.type(inputSearch, 'chicken');
    userEvent.click(radioName);
    userEvent.click(btnSearch);

    expect(global.fetch).toHaveBeenCalled();
    global.fetch.mockClear();
  });
  it('test radio button first letter', async () => {
    const { history } = renderWithRouter(<App />);

    jest.spyOn(global, 'alert');
    global.alert.mockImplementation(() => {});

    act(() => {
      history.push('/meals');
    });

    expect(history.location.pathname).toBe('/meals');

    const buttonSearch = screen.getByRole('button', { name: /search-icon/i });

    userEvent.click(buttonSearch);

    const inputSearch = screen.getByRole('textbox');
    const radioName = screen.getByRole('radio', { name: /first letter/i });
    const btnSearch = screen.getByTestId(SEARCHBTN);

    userEvent.type(inputSearch, 'c');
    userEvent.click(radioName);
    userEvent.click(btnSearch);
    userEvent.clear(inputSearch);
    userEvent.type(inputSearch, 'ccc');
    userEvent.click(btnSearch);

    waitFor(() => {
      expect(global.alert).toBeCalled();
    });
    expect(global.alert).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalled();
    global.fetch.mockClear();
  });
});

describe('test SearchBar /Drinks', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(drinks),
    }));
  });

  it('test radio button ingredient', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/drinks');
    });

    expect(history.location.pathname).toBe('/drinks');

    const buttonSearch = screen.getByRole('button', { name: /search-icon/i });
    userEvent.click(buttonSearch);

    const inputSearch = screen.getByRole('textbox');
    const radioName = screen.getByRole('radio', { name: /ingredient/i });
    const btnSearch = screen.getByTestId(SEARCHBTN);

    userEvent.type(inputSearch, 'chicken');
    userEvent.click(radioName);
    userEvent.click(btnSearch);

    expect(global.fetch).toHaveBeenCalled();
    global.fetch.mockClear();
  });
  it('test radio button first letter', async () => {
    const { history } = renderWithRouter(<App />);

    jest.spyOn(global, 'alert');
    global.alert.mockImplementation(() => {});

    act(() => {
      history.push('/drinks');
    });

    expect(history.location.pathname).toBe('/drinks');

    const buttonSearch = screen.getByRole('button', { name: /search-icon/i });
    userEvent.click(buttonSearch);

    const inputSearch = screen.getByRole('textbox');
    const radioName = screen.getByRole('radio', { name: /first letter/i });
    const btnSearch = screen.getByTestId(SEARCHBTN);

    userEvent.type(inputSearch, 'c');
    userEvent.click(radioName);
    userEvent.click(btnSearch);
    userEvent.clear(inputSearch);
    userEvent.type(inputSearch, 'ccc');
    userEvent.click(btnSearch);

    waitFor(() => {
      expect(global.alert).toBeCalled();
    });
    expect(global.alert).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalled();
    global.fetch.mockClear();
  });
});

describe('Testando o redireciomento da Details', () => {
  it('test radio button name meal', async () => {
    const { history } = renderWithRouter(<App />);
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(oneMeal),
    }));

    act(() => {
      history.push('/meals');
    });

    expect(history.location.pathname).toBe('/meals');

    const buttonSearch = screen.getByRole('button', { name: /search-icon/i });
    userEvent.click(buttonSearch);

    const inputSearch = screen.getByRole('textbox');
    const radioName = screen.getByRole('radio', { name: /name/i });
    const btnSearch = screen.getByTestId(SEARCHBTN);
    userEvent.type(inputSearch, 'Arrabiata');
    userEvent.click(radioName);
    expect(btnSearch).toBeInTheDocument();
    userEvent.click(btnSearch);
    await screen.findByTestId('recipe-category');
    expect(history.location.pathname).toBe('/meals/52771');

    expect(global.fetch).toHaveBeenCalled();
  });
});
