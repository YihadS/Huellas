import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

class RegistrarUsuario extends Component {
    constructor(props) {
        super(props);
    this.state = {
        clienteData: {
            username: '',
            contrasena: '',
            rol: '',
            userName: this.props.username
          },
    };
}

handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const newCliente = this.state.clienteData;
  
    fetch(`http://localhost:81/huellas/backend/registrarUsuario.php`, {
      method: 'POST',
      body: JSON.stringify(newCliente),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 200) {
          Swal.fire('¡Creado!', 'Se registró un nuevo usuario al sistema.', 'success');
          this.setState({
            clienteData: {
              nombre: '',
              costo: '',
              capacidad: '',
              userName: this.props.username
            }
          });
        } else {
          throw new Error('Error al registrar usuario');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        Swal.fire('Error', 'Ha ocurrido un error al registrar un usuario', 'error');
      });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
        clienteData: {
            ...prevState.clienteData,
            [name]: value
        }
    }));
};

  render() {
    return (
      <div id='root'>
        <h2>Registro de Usuario</h2>    
        <form onSubmit={this.handleSubmit}>
          <div className="FormField">
            <label>Nombre de Usuario:  </label>
            <input type="text" id="username" name="username" placeholder="Nombre de usuario"                         
            value={this.state.clienteData.username} onChange={this.handleInputChange} required/>
          </div>
          <div className="FormField">
            <label>Contraseña: </label>
            <input type="text" id="contrasena" name="contrasena" placeholder="Contraseña"               
            value={this.state.clienteData.contrasena} onChange={this.handleInputChange} required/>        
          </div>
          <div className="FormField">
            <label>Rol: </label>
            <select id="rol" name="rol" value={this.state.clienteData.rol} onChange={this.handleInputChange} required>
            <option selected>Selecciona el rol</option>
            <option value="Administrador">Administrador</option>
            <option value="Empleado">Empleado</option>
        </select>     
          </div>
          <button type="submit">Registrar Usuario</button>
        </form>
      </div>
    );
  }
}
 
export default RegistrarUsuario;
