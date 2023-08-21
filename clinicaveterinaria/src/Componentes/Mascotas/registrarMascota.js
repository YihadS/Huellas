import './registrarMascota.css';
import React, { Component } from 'react';
import axios from 'axios';
import Dashboard from '../../dashboard';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';
import Swal from 'sweetalert2';

class RegistrarMascota extends Component {
    constructor(props) {
        super(props);
    this.state = {
        mascotaData: {
            tipo: '',
            nombre: '',
            raza: '',
            edad: '',
            sexo: '',
            conducta: '',
            idCliente: ''
          },
          clientNames: [] 
    };
}

componentDidMount() {
    this.fetchClientNames();
}

fetchClientNames = async () => {
    try {
        const response = await fetch('http://localhost:81/huellas/backend/traerCliente.php');
        if (response.status === 200) {
            const clientNames = await response.json();
            console.log(clientNames); // Log the fetched client names
            this.setState({ clientNames });
        }
    } catch (error) {
        console.error('Error fetching client names:', error);
    }
};

handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const newMascota = this.state.mascotaData;
    console.log("Data to be sent:", newMascota); // Add this line

    fetch(`http://localhost:81/huellas/backend/registrarMascota.php`, {
      method: 'POST',
      body: JSON.stringify(newMascota),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 200) {
          Swal.fire('¡Creado!', 'Se registró una mascota', 'success');
          this.setState({
            mascotaData: {
                tipo: '',
                nombre: '',
                raza: '',
                edad: '',
                sexo: '',
                conducta: '',
                idCliente: ''
            }
          });
        } else {
          throw new Error('Error al registrar Mascota');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        Swal.fire('Error', 'Ha ocurrido un error al registrar una nueva mascota', 'error');
      });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
        mascotaData: {
            ...prevState.mascotaData,
            [name]: value
        }
        
    }));
    console.log('idCliente:', this.state.mascotaData.idCliente); // Log the value

};

  render() {
    return (
    <div id='root'>
        <h2>Registro de Mascotas</h2>    
        <form onSubmit={this.handleSubmit}>
        <div className="FormField">
        <label>Tipo: </label>
        <select id="tipo" name="tipo" value={this.state.mascotaData.tipo} onChange={this.handleInputChange} required>
            <option selected>Selecciona el tipo</option>
            <option value="Gato">Gato</option>
            <option value="Perro">Perro</option>
            <option value="Conejo">Conejo</option>
            <option value="Hamster">Hamster</option>
        </select>    
        </div>
        <div className="FormField">
        <label>Nombre: </label>
        <input type="text" id="nombre" name="nombre" placeholder="Nombre de la mascota"
        value={this.state.mascotaData.nombre} onChange={this.handleInputChange} required/>        
        </div>
        <div className="FormField">
        <label>Raza: </label>
        <input type="text" id="raza" name="raza" placeholder="Raza" 
        value={this.state.mascotaData.raza} onChange={this.handleInputChange} required/>        
        </div>
        <div className="FormField">
        <label>Edad: </label>
        <input type="number" id="edad" name="edad" min="0" placeholder="edad" 
        value={this.state.mascotaData.edad} onChange={this.handleInputChange} required/>        
        </div>
        <div className="FormField">
        <label>Sexo: </label>
        <select id="sexo" name="sexo" value={this.state.mascotaData.sexo} onChange={this.handleInputChange} required>
            <option selected>Selecciona el sexo</option>
            <option value="Macho" selected>Macho</option>
            <option value="Hembra">Hembra</option>
        </select>    
        </div>
        <div className="FormField">
        <label>Conducta: </label>
        <input type="text" id="conducta" name="conducta" 
        value={this.state.mascotaData.conducta} onChange={this.handleInputChange} required/>        
        </div>
        <div className="FormField">
        <label>Dueño: </label>
        <select id="idCliente" name="idCliente" value={this.state.mascotaData.idCliente} onChange={this.handleInputChange} required>
        <option selected>Selecciona al cliente</option>
                    {this.state.clientNames.map((client) => (
                      
                        <option selected key={client.id} value={client.id}>
                            {client.nombre} {client.apellidos}
                        </option>
                    ))}
        </select>   
        </div>
        <button type="submit">Registrar Mascota</button>
      </form>
      </div>
    );
  }
}
 
export default RegistrarMascota;