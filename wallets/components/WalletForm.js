import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { addCurrencies, addExpenses } from '../redux/actions';

class WalletForm extends Component {
  state = {
    // value: this.props.expenseToEdit ? this.props.expenseToEdit.value : '',
    value: '',
    // description: this.props.expenseToEdit ? this.props.expenseToEdit.description : '',
    description: '',
    // currency: this.props.expenseToEdit ? this.props.expenseToEdit.currency : 'USD',
    currency: 'USD',
    // method: this.props.expenseToEdit ? this.props.expenseToEdit.method : 'Cartão de crédito',
    method: 'Cartão de crédito',
    // tag: this.props.expenseToEdit ? this.props.expenseToEdit.tag : 'Lazer',
    tag: 'Lazer',
    // id: this.props.expenseToEdit ? this.props.expenseToEdit.id : null,
    id: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(addCurrencies());
  }

  onChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  onHandleSubmit = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { id } = this.state;

    dispatch(addExpenses({ ...this.state }));
    this.setState({
      value: '',
      description: '',

      id: id + 1,
    });
  };

  render() {
    const { currencies } = this.props;
    const { value, description } = this.state;
    return (
      <>
        <label htmlFor="inputValue">
          Gasto
          <input
            id="inputValue"
            type="text"
            value={ value }
            name="value"
            data-testid="value-input"
            onChange={ this.onChange }
          />
        </label>
        <label htmlFor="inputDescription">
          Descrição
          <input
            id="inputDescription"
            type="text"
            value={ description }
            name="description"
            data-testid="description-input"
            onChange={ this.onChange }
          />
        </label>
        <label htmlFor="inputCurrency">
          Câmbio
          <select
            id="inputCurrency"
            name="currency"
            data-testid="currency-input"
            onChange={ this.onChange }
          >
            <option value="USD">{ currencies[0] }</option>
            <option value="CAD">{ currencies[1] }</option>
            <option value="GBP">{ currencies[2] }</option>
            <option value="ARS">{ currencies[3] }</option>
            <option value="BTC">{ currencies[4] }</option>
            <option value="LTC">{ currencies[5] }</option>
            <option value="EUR">{ currencies[6] }</option>
            <option value="JPY">{ currencies[7] }</option>
            <option value="CHF">{ currencies[8] }</option>
            <option value="AUD">{ currencies[9] }</option>
            <option value="CNY">{ currencies[10]}</option>
            <option value="ILS">{ currencies[11] }</option>
            <option value="ETH">{ currencies[12] }</option>
            <option value="XRP">{ currencies[13] }</option>
            <option value="DOGE">{ currencies[14] }</option>
          </select>
        </label>
        <label htmlFor="inputMethod">
          Forma de Pagamento
          <select
            id="inputMethod"
            name="method"
            data-testid="method-input"
            onChange={ this.onChange }
          >
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="inputTag">
          Categoria
          <select
            id="inputTag"
            name="tag"
            data-testid="tag-input"
            onChange={ this.onChange }
          >
            <option value="Lazer">Lazer</option>
            <option value="Alimentação">Alimentação</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ (e) => this.onHandleSubmit(e) }
        >
          Adicionar Despesa
        </button>
      </>
    );
  }
}

WalletForm.propTypes = {
  currencies: Proptypes.arrayOf.isRequired,
  dispatch: Proptypes.func.isRequired,
  // expenseToEdit: Proptypes.arrayOf({}).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  expenseToEdit: state.wallet.expenseToEdit,
});

export default connect(mapStateToProps)(WalletForm);
