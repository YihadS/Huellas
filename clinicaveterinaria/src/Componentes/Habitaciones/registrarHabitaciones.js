import './registrarHabitaciones.css';
import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

class RegistrarHabitacion extends Component {
    constructor(props) {
        super(props);
    this.state = {
        clienteData: {
            nombre: '',
            apellidos: '',
            carnet: '',
            telefono: '',
            nacimiento: '',
            userName: this.props.username
          },
    };
}

handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const newCliente = this.state.clienteData;
  
    fetch(`http://localhost:81/huellas/backend/registrarHabitacion.php`, {
      method: 'POST',
      body: JSON.stringify(newCliente),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 200) {
          Swal.fire('¡Creado!', 'Se registró una nueva habitación.', 'success');
          this.setState({
            clienteData: {
              nombre: '',
              costo: '',
              capacidad: '',
              userName: this.props.username
            }
          });
        } else {
          throw new Error('Error al registrar habitación');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        Swal.fire('Error', 'Ha ocurrido un error al registrar una nueva habitación', 'error');
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
        <h2>Registro de Habitaciones</h2>    
        <form onSubmit={this.handleSubmit}>
          <div className="FormField">
            <label>Nombre:  </label>
            <input type="text" id="nombre" name="nombre" placeholder="Nombre de la Habitación"                         
            value={this.state.clienteData.nombre} onChange={this.handleInputChange} required/>
          </div>
          <div className="FormField">
            <label>Costo: </label>
            <input type="number" id="costo" name="costo" placeholder="Costo"               
            value={this.state.clienteData.costo} onChange={this.handleInputChange} required/>        
          </div>
          <div className="FormField">
            <label>Capacidad: </label>
            <select id="capacidad" name="capacidad" value={this.state.clienteData.capacidad} onChange={this.handleInputChange} required>
            <option selected>Selecciona la capacidad</option>
            <option value="2">2 mascotas</option>
            <option value="3">3 mascotas</option>
            <option value="4">4 mascotas</option>
            <option value="5">5 mascotas</option>
            <option value="6">6 mascotas</option>
            <option value="7">7 mascotas</option>
        </select>     
          </div>
          <button type="submit">Registrar Habitación</button>
        </form>
      </div>
    );
  }
}
 
export default RegistrarHabitacion;
