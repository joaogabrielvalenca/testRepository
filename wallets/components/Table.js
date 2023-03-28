import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { removeExpense, selectExpense } from '../redux/actions';

class Table extends Component {
  handleRemoveExpense = (expense) => {
    const { dispatch } = this.props;
    dispatch(removeExpense(expense));
  };

  handleEditExpense = (expense) => {
    const { dispatch } = this.props;
    dispatch(selectExpense(expense));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>

            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => {
            const exchangeList = Object.values(expense.exchangeRates);
            const currentCurrency = exchangeList.find(
              (item) => item.code === expense.currency,
            );
            return (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{Number(expense.value).toFixed(2)}</td>
                <td>{expense.currency}</td>
                <td>{Number(currentCurrency.ask).toFixed(2)}</td>
                <td>{(expense.value * currentCurrency.ask).toFixed(2)}</td>
                <td>{currentCurrency.name}</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.handleEditExpense(expense) }
                  >
                    Editar despesa
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.handleRemoveExpense(expense) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  dispatch: Proptypes.func.isRequired,
  expenses: Proptypes.arrayOf({}).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  expenseToEdit: state.wallet.expenseToEdit,
});

export default connect(mapStateToProps)(Table);
