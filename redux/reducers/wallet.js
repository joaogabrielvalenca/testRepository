import { ADD_CURRENCIES, ADD_EXPENSES, REMOVE_EXPENSE, SELECT_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  blank: '',
  expenseToEdit: {},
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_CURRENCIES: {
    return {
      ...state,
      currencies: action.payload,
    };
  }
  case ADD_EXPENSES: {
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  }
  case REMOVE_EXPENSE: {
    return {
      ...state,
      expenses: state.expenses.filter((item) => item !== action.payload),
    };
  }
  case SELECT_EXPENSE: {
    // const index = state.expenses.findIndex((item) => item === action.payload);
    // console.log(index);
     console.log(action.payload);
    return {
      ...state,
      expenses: state.expenses.map((item) => {
        if (item === action.payload) return action.payload;
        console.log(action.payload);
        return item;
      }),
    };
  }
  default: return state;
  }
};

export default wallet;
