// Coloque aqui suas actions

import fetchApiData from '../../services';

const ADD_EMAIL = 'ADD_EMAIL';
const ADD_CURRENCIES = 'ADD_CURRENCIES';
const ADD_EXPENSES = 'ADD_EXPENSES';
const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
const SELECT_EXPENSE = 'SELECT_EXPENSE';

const addEmail = (email) => ({
  type: ADD_EMAIL,
  payload: email,
});

const saveCurrencies = (currencies) => ({
  type: ADD_CURRENCIES,
  payload: currencies,
});

const addCurrencies = () => async (dispatch) => {
  const requestJson = await fetchApiData();
  const bruteRequest = Object.keys(requestJson);
  const refinedRequest = bruteRequest.filter((currency) => currency !== 'USDT');
  dispatch(saveCurrencies(refinedRequest));
};

const saveExpenses = (expenses) => ({
  type: ADD_EXPENSES,
  payload: expenses,
});

const addExpenses = (state) => async (dispatch) => {
  const request = await fetch('https://economia.awesomeapi.com.br/json/all');
  const requestJson = await request.json();
  const data = {
    ...state,
    exchangeRates: requestJson,
  };
  dispatch(saveExpenses(data));
};

const removeExpense = (expense) => ({
  type: REMOVE_EXPENSE,
  payload: expense,
});

const selectExpense = (expense) => ({
  type: SELECT_EXPENSE,
  payload: expense,
});

export {
  addEmail,
  addCurrencies,
  addExpenses,
  removeExpense,
  selectExpense,
  ADD_EMAIL,
  ADD_CURRENCIES,
  ADD_EXPENSES,
  REMOVE_EXPENSE,
  SELECT_EXPENSE,
};
