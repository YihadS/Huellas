import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

class RegistrarDoctor extends Component {
    constructor(props) {
        super(props);
    this.state = {
        clienteData: {
            nombre: '',
            apellidos: '',
            carnet: '',
            telefono: '',
            nacimiento: '',
            sueldo: '',
            especialidad: '',
            userName: this.props.username
          },
    };
}

handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const newCliente = this.state.clienteData;
  
    fetch(`http://localhost:81/huellas/backend/registrarDoctor.php`, {
      method: 'POST',
      body: JSON.stringify(newCliente),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 200) {
          Swal.fire('¡Creado!', 'Se registró un doctor.', 'success');
          this.setState({
            clienteData: {
              nombre: '',
              apellidos: '',
              carnet: '',
              telefono: '',
              nacimiento: '',
              userName: this.props.username
            }
          });
        } else {
          throw new Error('Error al registrar Doctor');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        Swal.fire('Error', 'Ha ocurrido un error al registrar un nuevo doctor', 'error');
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
        <h2>Registro de Doctores</h2>    
        <form onSubmit={this.handleSubmit}>
          <div className="FormField">
            <label>Nombre:  </label>
            <input type="text" id="nombre" name="nombre" placeholder="Nombre del doctor"                         
            value={this.state.clienteData.nombre} onChange={this.handleInputChange} required/>
          </div>
          <div className="FormField">
            <label>Apellidos: </label>
            <input type="text" id="apellidos" name="apellidos" placeholder="Apellido del doctor"               
            value={this.state.clienteData.apellidos} onChange={this.handleInputChange} required/>        
          </div>
          <div className="FormField">
            <label>Especialidad: </label>
            <input type="text" id="especialidad" name="especialidad" placeholder="Especialidad"               
            value={this.state.clienteData.especialidad} onChange={this.handleInputChange} required/>        
          </div>
          <div className="FormField">
            <label>Sueldo: </label>
            <input type="number" id="sueldo" name="sueldo" min="0" placeholder="Sueldo"        
            value={this.state.clienteData.sueldo} onChange={this.handleInputChange} required/>        
          </div>
          <div className="FormField">
            <label>Carnet: </label>
            <input type="number" id="carnet" name="carnet" min="0" placeholder="Carnet de Identidad"        
            value={this.state.clienteData.carnet} onChange={this.handleInputChange} required/>        
          </div>
          <div className="FormField">
            <label>Teléfono: </label>
            <input type="number" id="telefono" name="telefono" min="0" placeholder="Teléfono" 
            value={this.state.clienteData.telefono} onChange={this.handleInputChange} required/>        
          </div>
          <div className="FormField">
            <label>Fecha de Nacimiento: </label>
            <input type="date" id="nacimiento" name="nacimiento"                 
            value={this.state.clienteData.nacimiento} onChange={this.handleInputChange} required/>        
          </div>
          <button type="submit">Registrar Doctor</button>
        </form>
      </div>
    );
  }
}
 
export default RegistrarDoctor;
