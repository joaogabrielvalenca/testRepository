import React from 'react';
import { connect } from 'react-redux';
import WalletForm from '../components/WalletForm';
import Header from '../components/Header';
import Table from '../components/Table';

class Wallet extends React.Component {
  // componentDidMount() {
  //   const { dispatch } = this.props;
  //   const fetchApiDataToCurrencies = async () => {
  //     const request = await fetch('https://economia.awesomeapi.com.br/json/all');
  //     const requestJson = await request.json();
  //     const bruteRequest = Object.keys(requestJson);
  //     const refinedRequest = bruteRequest.filter((currency) => currency !== 'USDT');
  //     return dispatch(addCurrencies(refinedRequest));
  //   };
  //   fetchApiDataToCurrencies();
  // }

  render() {
    // const { currencies } = this.props;
    return (
      <>
        <Header />
        <main>
          <WalletForm />
        </main>
        <footer>
          <Table />
        </footer>
      </>
    );
  }
}

Wallet.propTypes = {

};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(Wallet);
