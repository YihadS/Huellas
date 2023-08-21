import './listaMascotas.css';
import React, { Component } from 'react';
import axios from 'axios';
import Dashboard from '../../dashboard';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';
import Swal from 'sweetalert2';

class ListaMascotas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientesData: [] // Initialize an empty array to hold client data
        };
    }

    componentDidMount() {
        this.fetchClientesData();
    }

    fetchClientesData = async () => {
        try {
            const response = await fetch('http://localhost:81/huellas/backend/traerMascota.php');
            if (response.status === 200) {
                const clientesData = await response.json();
                console.log(clientesData); // Log the fetched client data
                this.setState({ clientesData });
            }
        } catch (error) {
            console.error('Error fetching client data:', error);
        }
    };

    render() {
        const { clientesData } = this.state;

        return (
            <div id='root'>
                <h2>Listado de Mascotas</h2>
                <hr/>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tipo</th>
                            <th>Nombre</th>
                            <th>Raza</th>
                            <th>Edad</th>
                            <th>Sexo</th>
                            <th>Conducta</th>
                            <th>Dueño</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientesData.map((client) => (
                            <tr key={client.idMascota}>
                                <td>{client.idMascota}</td>
                                <td>{client.tipo}</td>
                                <td>{client.nombre}</td>
                                <td>{client.raza}</td>
                                <td>{client.edad}</td>
                                <td>{client.sexo}</td>
                                <td>{client.conducta}</td>
                                <td>{client.cliente}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ListaMascotas;