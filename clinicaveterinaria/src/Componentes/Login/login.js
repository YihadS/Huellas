import './login.css';
import React, { Component } from 'react';
import axios from 'axios';
import Dashboard from '../../dashboard';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      const root = createRoot(document.getElementById('root'));
      root.render(<Dashboard user={storedUser} />);
    }

    this.state = {
      name: '',
      password: '',
      error: ''
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const obj = {
      name: this.state.name,
      password: this.state.password,
      error: this.state.error
    };

    axios.post('http://localhost:81/huellas/backend/login.php', obj)
      .then(response => {
        const user = response.data;

        localStorage.setItem('user', JSON.stringify(user));
        const root = document.getElementById('root');
        ReactDOM.render(<Dashboard user={user} />, root);
      })
      .catch(error => {
        this.setState({ error: error.response.data });
        console.log(error.response.data);
      });

    this.setState({
      name: '',
      password: '',
      error: ''
    });
  }


  render() {
    return (
      <div className="Login">
      <form className="LoginForm">
        <center><img src={require('../../img/logo.png')} alt="Login Image" className="LoginImage" /></center>
        <div className="FormField">
          <input type="text" id="username" name="username" placeholder="Ingresa tu nombre de usuario" value={this.state.name} onChange={this.onChangeName}/>
        </div>
        <div className="FormField">
          <input type="password" id="contrasena" name="contrasena" placeholder="Ingresa tu contraseña" value={this.state.password} onChange={this.onChangePassword}/>
        </div>
        <center>{this.state.error && <p className='error'>{this.state.error}</p>}</center>
        <center><button type="submit" onClick={this.onSubmit}>Ingresar</button></center>
      </form>
    </div>
    );
  }
}
 
export default Login;