import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Button from '../components/Button';
import Header from '../components/Header';
import Input from '../components/Input';
import logo from '../trivia.png';

import { actionGetToken, setEmail as actionSetEmail,
  setUser as actionSetUser }
from '../redux/actions/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      btnDisabled: true,
    };
    this.validateEmail = this.validateEmail.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  clickButton = () => {
    const { getToken, setEmail, setUser } = this.props;
    const { email, name } = this.state;

    setEmail(email);
    setUser(name);
    getToken();
  }

  goToConfig = () => {
    const { history } = this.props;
    history.push('/config');
  }

  validateEmail() {
    const { email, name } = this.state;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+/i;
    // Regex de validacao pego do Stack Overflow  https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail

    if (emailRegex.test(email) && name.length > 0) {
      this.setState({
        btnDisabled: false,
      });
    } else {
      this.setState({
        btnDisabled: true,
      });
    }
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, () => this.validateEmail());
  }

  render() {
    const { btnDisabled, name, email } = this.state;
    // const { propName, propEmail } = this.props;
    return (
      <div>
        <header className="App-header">
          <Header />
          <img
            src={ logo }
            className="App-logo"
            alt="logo"
          />
        </header>
        <form>
          <div data-testid="input-player-name">
            <Input
              type="text"
              name="name"
              value={ name }
              label="Nome: "
              onChange={ this.handleChange }
            />
          </div>
          <div data-testid="input-gravatar-email">
            <Input
              type="email"
              name="email"
              value={ email }
              label="Email: "
              onChange={ this.handleChange }
            />
          </div>
          <div>
            <Button
              testid="btn-play"
              label="Play"
              onClick={ this.clickButton }
              disabled={ btnDisabled }
            />
          </div>
        </form>
        <Button
          testid="btn-settings"
          label="Configurações"
          onClick={ this.goToConfig }
        />
      </div>
    );
  }
}

Login.propTypes = {
  getToken: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  setEmail: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(actionGetToken()),
  setEmail: (email) => dispatch(actionSetEmail(email)),
  setUser: (user) => dispatch(actionSetUser(user)),
});

export default connect(null, mapDispatchToProps)(Login);
