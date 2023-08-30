import './registrarCitas.css';
import React, { Component } from 'react';
import axios from 'axios';
import Dashboard from '../../dashboard';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';
import Swal from 'sweetalert2';

class RegistrarCitas extends Component {
    constructor(props) {
        super(props);
    this.state = {
        clientSearchFilter: "",
        citaData: {
            fecha: '',
            idCliente: '',
            idMascota: '',
            idHabitacion: '',
            idDoctor: '',
            motivo: '',
            costo: '',
            userName: this.props.username

          },
          clientNames: [],
          doctorNames: [],
          mascotaNames: [],
          habitacionNames: [] 
    };
}

componentDidMount() {
    this.fetchClientNames();
    this.fetchDoctorNames();
    this.fetchMascotaNames();
    this.fetchHabitacionNames();
}

fetchClientNames = async () => {
    try {
        const response = await fetch('http://localhost:81/huellas/backend/traerCliente.php');
        if (response.status === 200) {
            const clientNames = await response.json();
            console.log(clientNames); 
            this.setState({ clientNames });
        }
    } catch (error) {
        console.error('Error fetching client names:', error);
    }
};

fetchDoctorNames = async () => {
    try {
        const response = await fetch('http://localhost:81/huellas/backend/traerDoctor.php');
        if (response.status === 200) {
            const doctorNames = await response.json();
            console.log(doctorNames); 
            this.setState({ doctorNames });
        }
    } catch (error) {
        console.error('Error fetching doctor names:', error);
    }
};

fetchMascotaNames = async () => {
    try {
        const response = await fetch('http://localhost:81/huellas/backend/traerMascota.php');
        if (response.status === 200) {
            const mascotaNames = await response.json();
            console.log(mascotaNames); 
            this.setState({ mascotaNames });
        }
    } catch (error) {
        console.error('Error fetching mascota names:', error);
    }
};

fetchHabitacionNames = async () => {
    try {
        const response = await fetch('http://localhost:81/huellas/backend/traerHabitacion.php');
        if (response.status === 200) {
            const habitacionNames = await response.json();
            console.log(habitacionNames); 
            this.setState({ habitacionNames });
        }
    } catch (error) {
        console.error('Error fetching habitacion names:', error);
    }
};

handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const newCita = this.state.citaData;
    console.log("Data to be sent:", newCita); 

    fetch(`http://localhost:81/huellas/backend/registrarCita.php`, {
      method: 'POST',
      body: JSON.stringify(newCita),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 200) {
          Swal.fire('¡Hecho!', 'Se registró la Cita', 'success');
          this.setState({
            citaData: {
                fecha: '',
                idCliente: '',
                idMascota: '',
                idHabitacion: '',
                idDoctor: '',
                motivo: '',
                costo: '',
                userName: this.props.username
            }
          });
        } else {
          throw new Error('Error al registrar la cita');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        Swal.fire('Error', 'Ha ocurrido un error al registrar la cita', 'error');
      });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
        citaData: {
            ...prevState.citaData,
            [name]: value
        }
        
    }));
    console.log('idCita:', this.state.citaData.idCita); // Log the value

};

handleClientSelection = (clientId) => {
    const selectedClient = this.state.clientNames.find(client => client.idCliente === clientId);
    if (selectedClient) {
      this.setState((prevState) => ({
        citaData: {
          ...prevState.citaData,
          idCliente: clientId,
        },
        clientSearchFilter: `${selectedClient.nombre} ${selectedClient.apellidos}`, // Display selected client's name in the input
      }));
    }
  };

  handleMascotaSelection = (mascotaId) => {
    const selectedMascota = this.state.mascotaNames.find(mascota => mascota.idMascota === mascotaId);
    if (selectedMascota) {
      this.setState((prevState) => ({
        citaData: {
          ...prevState.citaData,
          idMascota: mascotaId,
        },
        mascotaSearchFilter: `${selectedMascota.nombre} - ${selectedMascota.tipo}`, // Display selected mascota's name and type in the input
      }));
    }
  };

  handleDoctorSelection = (doctorId) => {
    const selectedDoctor = this.state.doctorNames.find(doctor => doctor.idDoctor === doctorId);
    if (selectedDoctor) {
      this.setState((prevState) => ({
        citaData: {
          ...prevState.citaData,
          idDoctor: doctorId,
        },
        doctorSearchFilter: `${selectedDoctor.nombre} ${selectedDoctor.apellidos} - ${selectedDoctor.especialidad}`, // Display selected doctor's name and specialization in the input
      }));
    }
  };

  handleHabitacionSelection = (habitacionId) => {
    const selectedHabitacion = this.state.habitacionNames.find(habitacion => habitacion.idHabitacion === habitacionId);
    if (selectedHabitacion) {
      this.setState((prevState) => ({
        citaData: {
          ...prevState.citaData,
          idHabitacion: habitacionId,
        },
        habitacionSearchFilter: `${selectedHabitacion.nombre} - ${selectedHabitacion.capacidad} personas`, // Display selected habitacion's name and capacity in the input
      }));
    }
  };

  render() {
    return (
    <div id='root'>
        <h2>Registro de Citas</h2>    
        <form onSubmit={this.handleSubmit}>
            <div className="row">
            <div className='col'>
<div className="FormField">
        <label>Seleccione la fecha: </label><br/>
        <input type="datetime-local" id="fecha" name="fecha" value={this.state.citaData.fecha} onChange={this.handleInputChange} required/>        
</div>
<div className="FormField">
          <label>Cliente: </label>
          <div className="custom-dropdown">
            <input
              type="text"
              placeholder="Buscar cliente..."
              value={this.state.clientSearchFilter}
              onChange={(e) => this.setState({ clientSearchFilter: e.target.value })}
            />
            {/* Display dropdown only when there's a filter and clientNames */}
            {this.state.clientSearchFilter && this.state.clientNames.length > 0 && (
              <div className="dropdown-list">
                {this.state.clientNames
                  .filter(
                    (client) =>
                      client.nombre.toLowerCase().includes(this.state.clientSearchFilter.toLowerCase()) ||
                      client.apellidos.toLowerCase().includes(this.state.clientSearchFilter.toLowerCase())
                  )
                  .map((client) => (
                    <div
                      key={client.idCliente}
                      className="dropdown-item"
                      onClick={() => this.handleClientSelection(client.idCliente)}
                    >
                      {client.nombre} {client.apellidos}
                    </div>
                  ))}
              </div>
            )}
          </div>
          {/* Use the selected client's ID directly as the value */}
          <input
            type="hidden"
            id="idCliente"
            name="idCliente"
            value={this.state.citaData.idCliente}
            onChange={this.handleInputChange}
          />
</div>
<div className="FormField">
  <label>Mascota: </label>
  <div className="custom-dropdown">
    <input
      type="text"
      placeholder="Buscar mascota..."
      value={this.state.mascotaSearchFilter}
      onChange={(e) => this.setState({ mascotaSearchFilter: e.target.value })}
    />
    {this.state.mascotaSearchFilter && this.state.mascotaNames.length > 0 && (
      <div className="dropdown-list">
        {this.state.mascotaNames
          .filter(
            (mascota) =>
              mascota.nombre.toLowerCase().includes(this.state.mascotaSearchFilter.toLowerCase()) ||
              mascota.tipo.toLowerCase().includes(this.state.mascotaSearchFilter.toLowerCase())
          )
          .map((mascota) => (
<div className="dropdown-item" onClick={() => this.handleMascotaSelection(mascota.idMascota)}>
  {mascota.nombre} - {mascota.tipo}
</div>
          ))}
      </div>
    )}
  </div>
</div>
<div className="FormField">
  <label>Doctor Asignado: </label>
  <div className="custom-dropdown">
    <input
      type="text"
      placeholder="Buscar doctor..."
      value={this.state.doctorSearchFilter}
      onChange={(e) => this.setState({ doctorSearchFilter: e.target.value })}
    />
    {this.state.doctorSearchFilter && this.state.doctorNames.length > 0 && (
      <div className="dropdown-list">
        {this.state.doctorNames
          .filter(
            (doctor) =>
              doctor.nombre.toLowerCase().includes(this.state.doctorSearchFilter.toLowerCase()) ||
              doctor.apellidos.toLowerCase().includes(this.state.doctorSearchFilter.toLowerCase())
          )
          .map((doctor) => (
<div className="dropdown-item" onClick={() => this.handleDoctorSelection(doctor.idDoctor)}>
  {doctor.nombre} {doctor.apellidos} - {doctor.especialidad}
</div>
          ))}
      </div>
    )}
  </div>
</div>
<div className="FormField">
  <label>Habitación Asignada: </label>
  <div className="custom-dropdown">
    <input
      type="text"
      placeholder="Buscar habitación..."
      value={this.state.habitacionSearchFilter}
      onChange={(e) => this.setState({ habitacionSearchFilter: e.target.value })}
    />
    {this.state.habitacionSearchFilter && this.state.habitacionNames.length > 0 && (
      <div className="dropdown-list">
        {this.state.habitacionNames
          .filter(
            (habitacion) =>
              habitacion.nombre.toLowerCase().includes(this.state.habitacionSearchFilter.toLowerCase()) ||
              habitacion.capacidad.toString().includes(this.state.habitacionSearchFilter.toLowerCase())
          )
          .map((habitacion) => (
<div className="dropdown-item" onClick={() => this.handleHabitacionSelection(habitacion.idHabitacion)}>
  {habitacion.nombre} - {habitacion.capacidad} personas
</div>
          ))}
      </div>
    )}
  </div>
</div>
            </div>
            <div className='col'>
        <div className="FormField">
        <label>Costo: </label><br/>
        <input type="number" min='0' id="costo" name="costo" placeholder="Costo"
        value={this.state.citaData.costo} onChange={this.handleInputChange} required/>        
        </div>
        <div className="FormField">
        <label>Motivo: </label><br/>
        <input type="text" id="motivo" name="motivo" placeholder="Escriba el motivo de la cita"
        value={this.state.citaData.motivo} onChange={this.handleInputChange} style={{  width: '60%', height: "80px" }} required/>        
        </div>
        <button type="submit">Realizar Cita</button>
            </div>
            </div>
      </form>
      </div>
    );
  }
}
 
export default RegistrarCitas;
