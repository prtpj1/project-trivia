import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from '../components/Input';
import Button from '../components/Button';
import { actionGetToken } from '../redux/actions/action';

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

  handleButton = () => {
    const { getToken } = this.props;
    getToken();
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
              onClick={ this.handleButton }
              disabled={ btnDisabled }
            />
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  getToken: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(actionGetToken()),
});

export default connect(null, mapDispatchToProps)(Login);
