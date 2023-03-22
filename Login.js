import React from 'react';
import { connect } from 'react-redux';
import { loginUser, nameUser } from '../redux/actions/loginUser';
import '../styles/Login.css';
// import PropTypes from 'prop-types';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    isValid: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.validate();
    });
  };

  handleRequest = async () => {
    const { history, dispatch } = this.props;
    const { name, email } = this.state;
    dispatch(loginUser(email));
    dispatch(nameUser(name));
    const TRIVIA_REQUEST = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(TRIVIA_REQUEST);
    const data = await response.json();
    localStorage.setItem('token', data.token);
    const localToken = localStorage.getItem('token');
    const URL = `https://opentdb.com/api.php?amount=5&token=${localToken}`;
    const responseToken = await fetch(URL);
    const dataToken = await responseToken.json();
    if (dataToken.response_code === 0) {
      history.push({
        pathname: '/game',
        state: dataToken.results,
      });
    } else {
      localStorage.setItem('token', '');
      history.push('/');
    }
  };

  validate = () => {
    const { name, email } = this.state;
    if (name && email) {
      this.setState({
        isValid: true,
      });
    } else {
      this.setState({
        isValid: false,
      });
    }
  };

  redirectSettings = () => {
    const { history, dispatch } = this.props;
    const { name, email } = this.state;
    dispatch(loginUser(email));
    dispatch(nameUser(name));
    history.push('/settings');
  };

  render() {
    const { name, email, isValid } = this.state;
    return (
      <div className="login-container">
        <form
          id="form"
          onSubmit={ (e) => {
            e.preventDefault();
            this.handleRequest();
          } }
        >
          <input
            data-testid="input-player-name"
            type="text"
            name="name"
            value={ name }
            onChange={ this.handleChange }
          />
          <input
            data-testid="input-gravatar-email"
            type="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            data-testid="btn-play"
            disabled={ !isValid }
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            id="btnSettings"
            className="btnSettings"
            onClick={ () => this.redirectSettings() }
          >
            Settings
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = () => ({
});

Login.propTypes = {
}.isRequired;

export default connect(mapStateToProps)(Login);
