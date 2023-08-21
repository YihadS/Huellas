import './listaClientes.css';
import React, { Component } from 'react';
import axios from 'axios';
import Dashboard from '../../dashboard';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';
import Swal from 'sweetalert2';

class ListaClientes extends Component {
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
            const response = await fetch('http://localhost:81/huellas/backend/traerCliente.php');
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
                <h2>Listado de Clientes</h2>
                <hr/>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Carnet</th>
                            <th>Teléfono</th>
                            <th>Fecha de nacimiento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientesData.map((client) => (
                            <tr key={client.idCliente}>
                                <td>{client.idCliente}</td>
                                <td>{client.nombre}</td>
                                <td>{client.apellidos}</td>
                                <td>{client.carnet}</td>
                                <td>{client.telefono}</td>
                                <td>{client.nacimiento}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ListaClientes;